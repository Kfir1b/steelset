import { test, expect } from './support/fixtures.js'
import { openDemo, nav, tab, logWorkout, historyCard } from './support/helpers.js'

const ACCENT = 'rgb(255, 107, 43)'
const MUTED = 'rgb(102, 102, 102)'

const TABS = [
  ['Home', '/', 'Dashboard'],
  ['Log', '/log', 'Log Workout'],
  ['History', '/history', 'History'],
  ['Library', '/exercises', 'Exercise Library'],
  ['Progress', '/progress', 'Progress'],
]

test('nav bar has exactly the five tabs, in order', async ({ page }) => {
  await openDemo(page)
  await expect(nav(page).getByRole('button')).toHaveText(['⊞Home', '＋Log', '◷History', '◈Library', '↗Progress'])
})

test('each tab opens its page and is highlighted while active', async ({ page }) => {
  await openDemo(page)
  for (const [label, path, heading] of TABS) {
    await tab(page, label).click()
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    for (const [other] of TABS) {
      await expect(tab(page, other)).toHaveCSS('color', other === label ? ACCENT : MUTED)
    }
  }
})

for (const [label, path, heading] of TABS) {
  test(`deep link to ${path} works in demo mode`, async ({ page }) => {
    await openDemo(page, path)
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    await expect(tab(page, label)).toHaveCSS('color', ACCENT)
  })
}

for (const path of ['/', '/log', '/history', '/exercises', '/progress']) {
  test(`${path} redirects to sign-in when not logged in`, async ({ page }) => {
    await page.goto(path)
    await expect(page).toHaveURL(/\/auth$/)
    await expect(page.getByRole('button', { name: 'SIGN IN' })).toBeVisible()
    await expect(nav(page)).toHaveCount(0)
  })
}

test('demo data survives a reload', async ({ page }) => {
  await openDemo(page)
  const note = await logWorkout(page)
  await page.reload()
  await tab(page, 'History').click()
  await expect(historyCard(page, note)).toHaveCount(1)
})

test('opening a ?demo=1 link again does not reset the demo data', async ({ page }) => {
  await openDemo(page)
  const note = await logWorkout(page)
  await openDemo(page, '/history')
  await expect(historyCard(page, note)).toHaveCount(1)
})

test('the demo is private to its browser tab', async ({ page, context }) => {
  await openDemo(page)
  const other = await context.newPage()
  await other.goto('/')
  await expect(other).toHaveURL(/\/auth$/)
  await other.close()
})

test('the app still loads when sessionStorage is blocked', async ({ page }) => {
  // e.g. strict privacy settings: any sessionStorage access throws
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() { throw new DOMException('The operation is insecure.', 'SecurityError') },
    })
  })
  await page.goto('/?demo=1')
  // Demo mode can't start without storage, so it falls back to sign-in.
  await expect(page).toHaveURL(/\/auth$/)
  await expect(page.getByRole('button', { name: 'SIGN IN' })).toBeVisible()
})
