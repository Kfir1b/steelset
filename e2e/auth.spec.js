// Real (non-demo) mode. Supabase is mocked at the network layer, so these tests
// exercise the app's actual supabase-js calls without a backend: each test
// checks both what the UI does and what the app sent to Supabase.
import { test, expect, SUPABASE_URL } from './support/fixtures.js'
import { nav, tab, startWorkout, addSet, logSetRows, historyCards, cardHeader } from './support/helpers.js'

const USER = {
  id: '11111111-1111-4111-8111-111111111111',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'lifter@example.test',
  app_metadata: { provider: 'email' },
  user_metadata: {},
  created_at: '2026-01-01T00:00:00Z',
}

const b64url = obj => Buffer.from(JSON.stringify(obj)).toString('base64url')

function session() {
  const exp = Math.floor(Date.now() / 1000) + 3600
  return {
    access_token: `${b64url({ alg: 'HS256', typ: 'JWT' })}.${b64url({ sub: USER.id, role: 'authenticated', exp })}.sig`,
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: exp,
    refresh_token: 'e2e-refresh-token',
    user: USER,
  }
}

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-allow-methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'access-control-expose-headers': '*',
}

/**
 * Route every Supabase request to `handler(req)`, which returns
 * { status, json } (or undefined → 404). Returns the list of requests seen.
 */
async function mockSupabase(page, handler) {
  const calls = []
  await page.route(`${SUPABASE_URL}/**`, async route => {
    const req = route.request()
    if (req.method() === 'OPTIONS') return route.fulfill({ status: 204, headers: CORS })
    const url = new URL(req.url())
    const call = { method: req.method(), path: url.pathname, query: url.searchParams, body: req.postDataJSON?.() ?? null }
    calls.push(call)
    const res = (await handler(call)) ?? { status: 404, json: { message: `unmocked ${call.method} ${call.path}` } }
    if (res.json === undefined) return route.fulfill({ status: res.status, headers: CORS })
    return route.fulfill({ status: res.status, headers: { ...CORS, 'content-type': 'application/json' }, body: JSON.stringify(res.json) })
  })
  return calls
}

const signInButton = page => page.getByRole('button', { name: 'SIGN IN' })

async function signIn(page) {
  await page.getByPlaceholder('Email').fill(USER.email)
  await page.getByPlaceholder('Password').fill('correct horse')
  await signInButton(page).click()
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.goto('/auth')
})

test.describe('sign-in page', () => {
  test('renders the sign-in form and demo entry', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /^LIFT\.\s*LOAD\.\s*DOMINATE\.$/ })).toBeVisible()
    await expect(page.getByPlaceholder('Email')).toBeVisible()
    await expect(page.getByPlaceholder('Password')).toHaveAttribute('type', 'password')
    await expect(signInButton(page)).toBeVisible()
    await expect(page.getByRole('button', { name: '⚡ TRY THE DEMO' })).toBeVisible()
    await expect(nav(page)).toHaveCount(0)
  })

  test('toggles between sign in and sign up', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(page.getByRole('button', { name: 'CREATE ACCOUNT' })).toBeVisible()
    await expect(page.getByText('Have an account?')).toBeVisible()
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(signInButton(page)).toBeVisible()
    await expect(page.getByText('No account?')).toBeVisible()
  })

  test('email and password are required', async ({ page, supabaseRequests }) => {
    await signInButton(page).click()
    expect(await page.getByPlaceholder('Email').evaluate(el => el.validity.valueMissing)).toBe(true)
    await page.getByPlaceholder('Email').fill(USER.email)
    await signInButton(page).click()
    expect(await page.getByPlaceholder('Password').evaluate(el => el.validity.valueMissing)).toBe(true)
    expect(supabaseRequests).toHaveLength(0)
  })

  test('"Try the demo" enters demo mode', async ({ page }) => {
    await page.getByRole('button', { name: '⚡ TRY THE DEMO' }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.getByText('DEMO MODE — SAMPLE DATA, NOTHING IS SAVED')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })
})

test.describe('sign in', () => {
  test('wrong credentials show the Supabase error and a loading state meanwhile', async ({ page }) => {
    let release
    const gate = new Promise(r => { release = r })
    const calls = await mockSupabase(page, async ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') {
        await gate
        return { status: 400, json: { code: 400, error_code: 'invalid_credentials', msg: 'Invalid login credentials' } }
      }
    })
    await page.getByPlaceholder('Email').fill(USER.email)
    await page.getByPlaceholder('Password').fill('wrong')
    await signInButton(page).click()

    const loading = page.getByRole('button', { name: 'LOADING...' })
    await expect(loading).toBeDisabled()
    release()

    await expect(page.getByText('Invalid login credentials')).toBeVisible()
    await expect(signInButton(page)).toBeEnabled()
    await expect(page).toHaveURL(/\/auth$/)
    expect(calls).toHaveLength(1)
    expect(calls[0].query.get('grant_type')).toBe('password')
    expect(calls[0].body).toMatchObject({ email: USER.email, password: 'wrong' })
  })

  test('switching mode clears the error', async ({ page }) => {
    await mockSupabase(page, () => ({ status: 400, json: { msg: 'Invalid login credentials' } }))
    await page.getByPlaceholder('Email').fill(USER.email)
    await page.getByPlaceholder('Password').fill('wrong')
    await signInButton(page).click()
    await expect(page.getByText('Invalid login credentials')).toBeVisible()
    await page.getByRole('button', { name: 'Sign up' }).click()
    await expect(page.getByText('Invalid login credentials')).toBeHidden()
  })

  test('valid credentials open the dashboard with the user\'s workouts', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') {
        return {
          status: 200,
          json: [{ id: 'w1', user_id: USER.id, date: '2026-10-16', type: 'Legs', notes: '', sets: [
            { id: 's1', workout_id: 'w1', exercise: 'Squat', set_number: 1, reps: 5, weight: 100, unit: 'kg' },
          ] }],
        }
      }
    })
    await signIn(page)

    await expect(page.getByText('DEMO MODE')).toHaveCount(0)
    await expect(page.locator('.fade-up')).toHaveText([/^Legs DayFri, Oct 161SETS$/])

    const list = calls.find(c => c.method === 'GET' && c.path === '/rest/v1/workouts')
    expect(list.query.get('select')).toBe('*,sets(*)')
    expect(list.query.get('user_id')).toBe(`eq.${USER.id}`)
    expect(list.query.get('order')).toBe('date.desc')
  })

  test('the session survives a reload', async ({ page }) => {
    await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (path === '/auth/v1/user') return { status: 200, json: USER }
    })
    await signIn(page)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
    await expect(page.getByText('No workouts yet.Start logging!')).toBeVisible()
  })

  test('logout signs out with Supabase and returns to sign-in', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (method === 'POST' && path === '/auth/v1/logout') return { status: 204 }
    })
    await signIn(page)
    await page.getByRole('button', { name: 'LOGOUT' }).click()
    await expect(page).toHaveURL(/\/auth$/)
    await expect(signInButton(page)).toBeVisible()
    expect(calls.some(c => c.method === 'POST' && c.path === '/auth/v1/logout')).toBe(true)
  })
})

test.describe('sign up', () => {
  test('when email confirmation is required, asks the user to check their email', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path }) => {
      // No access_token in the response → no session yet
      if (method === 'POST' && path === '/auth/v1/signup') return { status: 200, json: { ...USER, identities: [{}] } }
    })
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.getByPlaceholder('Email').fill(USER.email)
    await page.getByPlaceholder('Password').fill('correct horse')
    await page.getByRole('button', { name: 'CREATE ACCOUNT' }).click()

    await expect(page.getByRole('heading', { name: 'Check your email' })).toBeVisible()
    await expect(page.getByText(USER.email)).toBeVisible()
    expect(calls[0].body).toMatchObject({ email: USER.email, password: 'correct horse' })

    await page.getByRole('button', { name: 'BACK TO SIGN IN' }).click()
    await expect(signInButton(page)).toBeVisible()
  })

  test('when Supabase returns a session right away, goes straight to the dashboard', async ({ page }) => {
    await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/signup') return { status: 200, json: session() }
      if (path === '/rest/v1/workouts') return { status: 200, json: [] }
    })
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.getByPlaceholder('Email').fill(USER.email)
    await page.getByPlaceholder('Password').fill('correct horse')
    await page.getByRole('button', { name: 'CREATE ACCOUNT' }).click()
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('a sign-up error is shown', async ({ page }) => {
    await mockSupabase(page, () => ({ status: 422, json: { code: 422, error_code: 'user_already_exists', msg: 'User already registered' } }))
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.getByPlaceholder('Email').fill(USER.email)
    await page.getByPlaceholder('Password').fill('correct horse')
    await page.getByRole('button', { name: 'CREATE ACCOUNT' }).click()
    await expect(page.getByText('User already registered')).toBeVisible()
  })
})

test.describe('logged in (Supabase backend)', () => {
  test('logging a workout and sets sends the right rows to Supabase', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path, body }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (method === 'POST' && path === '/rest/v1/workouts') return { status: 201, json: { id: 'w-new', ...body } }
      if (method === 'POST' && path === '/rest/v1/sets') return { status: 201, json: { id: 's-new', ...body } }
      if (method === 'DELETE' && path === '/rest/v1/sets') return { status: 204 }
    })
    await signIn(page)
    await startWorkout(page, { type: 'Legs', date: '2026-10-16', note: 'heavy day' })
    await addSet(page, { exercise: 'Squat', reps: 5, weight: 100 })
    await expect(logSetRows(page, 'Squat')).toHaveText([/^S15 reps@ 100kg· Barbell/])

    const insertWorkout = calls.find(c => c.method === 'POST' && c.path === '/rest/v1/workouts')
    expect(insertWorkout.body).toEqual({ user_id: USER.id, date: '2026-10-16', type: 'Legs', notes: 'heavy day' })
    const insertSet = calls.find(c => c.method === 'POST' && c.path === '/rest/v1/sets')
    expect(insertSet.body).toEqual({
      workout_id: 'w-new', exercise: 'Squat', set_number: 1, reps: 5, weight: 100, unit: 'kg', equipment: 'Barbell',
    })

    await logSetRows(page, 'Squat').first().getByRole('button', { name: '×' }).click()
    await expect(logSetRows(page, 'Squat')).toHaveCount(0)
    const del = calls.find(c => c.method === 'DELETE' && c.path === '/rest/v1/sets')
    expect(del.query.get('id')).toBe('eq.s-new')
  })

  test('a custom exercise is saved with equipment null', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path, body }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (method === 'POST' && path === '/rest/v1/workouts') return { status: 201, json: { id: 'w-new', ...body } }
      if (method === 'POST' && path === '/rest/v1/sets') return { status: 201, json: { id: 's-new', ...body } }
    })
    await signIn(page)
    await startWorkout(page, { type: 'Full' })
    await addSet(page, { exercise: 'Sled Push', reps: 4, weight: 120 })
    const insertSet = calls.find(c => c.method === 'POST' && c.path === '/rest/v1/sets')
    expect(insertSet.body).toMatchObject({ exercise: 'Sled Push', equipment: null })
  })

  test('a workout-creation failure without a message shows a generic error', async ({ page }) => {
    await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (method === 'POST' && path === '/rest/v1/workouts') return { status: 500, json: {} }
    })
    await signIn(page)
    await tab(page, 'Log').click()
    await page.getByRole('button', { name: /START WORKOUT/ }).click()
    await expect(page.getByText('Failed to create workout. Please try again.')).toBeVisible()
  })

  test('if loading workouts fails, pages still render (as empty)', async ({ page }) => {
    await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') return { status: 500, json: { message: 'database is down' } }
    })
    await signIn(page)
    // Note: the error itself is not shown anywhere; the user just sees "no workouts".
    await expect(page.getByText('No workouts yet.Start logging!')).toBeVisible()
    await tab(page, 'History').click()
    await expect(page.getByText('No workouts found.')).toBeVisible()
    await tab(page, 'Progress').click()
    await expect(page.getByText('Log some workouts to see your progress here.')).toBeVisible()
  })

  test('a failure to create the workout is shown on the Log page', async ({ page }) => {
    await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') return { status: 200, json: [] }
      if (method === 'POST' && path === '/rest/v1/workouts') return { status: 500, json: { message: 'database is down' } }
    })
    await signIn(page)
    await tab(page, 'Log').click()
    await page.getByRole('button', { name: /START WORKOUT/ }).click()
    await expect(page.getByText('database is down')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Log Workout' })).toBeVisible()
    await expect(page.getByRole('button', { name: /START WORKOUT/ })).toBeEnabled()
  })

  test('deleting a workout in History deletes it in Supabase', async ({ page }) => {
    const calls = await mockSupabase(page, ({ method, path }) => {
      if (method === 'POST' && path === '/auth/v1/token') return { status: 200, json: session() }
      if (method === 'GET' && path === '/rest/v1/workouts') {
        return { status: 200, json: [{ id: 'w1', user_id: USER.id, date: '2026-10-16', type: 'Push', notes: '', sets: [
          { id: 's1', workout_id: 'w1', exercise: 'Bench Press', set_number: 1, reps: 5, weight: 80, unit: 'kg', equipment: 'Barbell' },
        ] }] }
      }
      if (method === 'DELETE' && path === '/rest/v1/workouts') return { status: 204 }
    })
    await signIn(page)
    await tab(page, 'History').click()
    await cardHeader(historyCards(page).first()).click()
    await page.getByRole('button', { name: /DELETE WORKOUT/ }).click()
    await page.getByRole('button', { name: 'DELETE', exact: true }).click()
    await expect(historyCards(page)).toHaveCount(0)

    const del = calls.find(c => c.method === 'DELETE' && c.path === '/rest/v1/workouts')
    expect(del.query.get('id')).toBe('eq.w1')
  })
})
