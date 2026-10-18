import { test, expect } from './support/fixtures.js'
import {
  openDemo, tab, TODAY, uniqueNote, startWorkout, addSet, logWorkout,
  exerciseInput, repsInput, weightInput, unitSelect, equipmentSelect, addSetButton,
  logSetRows, historyCard, cardHeader, cardSetCount, latestDemoWorkout,
} from './support/helpers.js'
import { EXERCISE_SUGGESTIONS } from '../src/data/exercises.js'

test.beforeEach(async ({ page }) => {
  await openDemo(page)
})

test.describe('start form', () => {
  test('defaults to today, Push, and empty notes', async ({ page }) => {
    await tab(page, 'Log').click()
    await expect(page.locator('input[type="date"]')).toHaveValue(TODAY)
    await expect(page.getByPlaceholder('How are you feeling today?')).toHaveValue('')
    // Selected type is styled with the accent background
    await expect(page.getByRole('button', { name: 'Push', exact: true })).toHaveCSS('background-color', 'rgb(255, 107, 43)')
    await expect(page.getByRole('button', { name: 'Pull', exact: true })).not.toHaveCSS('background-color', 'rgb(255, 107, 43)')

    await page.getByRole('button', { name: /START WORKOUT/ }).click()
    await expect(page.getByText('PUSH DAY')).toBeVisible()
    await expect(page.getByText(TODAY)).toBeVisible()
  })

  test('every workout type can be started', async ({ page }) => {
    for (const type of ['Push', 'Pull', 'Legs', 'Full', 'Cardio', 'Rest']) {
      await startWorkout(page, { type })
      await expect(page.getByText(`${type.toUpperCase()} DAY`)).toBeVisible()
    }
  })

  test('chosen date is shown and saved with the workout', async ({ page }) => {
    const note = uniqueNote()
    await startWorkout(page, { type: 'Legs', date: '2026-03-15', note })
    await expect(page.getByText('2026-03-15')).toBeVisible()

    await tab(page, 'History').click()
    await expect(historyCard(page, note)).toContainText('Sun, Mar 15, 2026')
  })

  test('the workout is saved as soon as it is started, before any sets', async ({ page }) => {
    const note = await logWorkout(page, { type: 'Pull' })
    await tab(page, 'History').click()
    const card = historyCard(page, note)
    await expect(card).toContainText('Pull Day')
    await expect(cardSetCount(card)).toHaveText('0SETS')
  })

  test('just after midnight, defaults to the local date (ahead of UTC)', async ({ page }) => {
    // 01:30 on Oct 18 in Israel is still Oct 17 in UTC.
    await openDemo(page, '/', { clock: new Date('2026-10-18T01:30:00+03:00') })
    const note = uniqueNote()
    await tab(page, 'Log').click()
    await expect(page.locator('input[type="date"]')).toHaveValue('2026-10-18')
    await startWorkout(page, { note })
    await tab(page, 'History').click()
    await expect(historyCard(page, note)).toContainText('Sun, Oct 18, 2026')
  })
})

test.describe('in a timezone behind UTC', () => {
  test.use({ timezoneId: 'America/New_York' })

  test('late evening defaults to the local date', async ({ page }) => {
    // 21:00 on Oct 18 in New York is already Oct 19 in UTC.
    await openDemo(page, '/log', { clock: new Date('2026-10-18T21:00:00-04:00') })
    await expect(page.locator('input[type="date"]')).toHaveValue('2026-10-18')
  })
})

test.describe('add sets', () => {
  test.beforeEach(async ({ page }) => {
    await startWorkout(page, { type: 'Push' })
  })

  test('shows the empty state before any set is added', async ({ page }) => {
    await expect(page.getByText('No sets yet — add your first one above!')).toBeVisible()
  })

  test('a set shows reps, weight, unit and equipment', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 62.5 })
    await expect(page.getByText('No sets yet')).toBeHidden()
    const rows = logSetRows(page, 'Bench Press')
    await expect(rows).toHaveCount(1)
    await expect(rows.first()).toHaveText('S18 reps@ 62.5kg· Barbell×')
  })

  test('shows a confirmation that clears after a moment', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 60 })
    await expect(addSetButton(page)).toHaveText('✓ SET ADDED')
    await expect(addSetButton(page)).toHaveText('+ ADD SET', { timeout: 5000 })
  })

  test('keeps exercise and unit but clears reps and weight after adding', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 135, unit: 'lbs' })
    await expect(exerciseInput(page)).toHaveValue('Bench Press')
    await expect(unitSelect(page)).toHaveValue('lbs')
    await expect(repsInput(page)).toHaveValue('')
    await expect(weightInput(page)).toHaveValue('')
  })

  test('lbs unit is shown on the set', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 5, weight: 135, unit: 'lbs' })
    await expect(logSetRows(page, 'Bench Press').first()).toContainText('@ 135lbs')
  })

  test('a set without weight is saved as bodyweight (no "@")', async ({ page }) => {
    await addSet(page, { exercise: 'Push-ups', reps: 20 })
    const row = logSetRows(page, 'Push-ups').first()
    await expect(row).toContainText('20 reps')
    await expect(row).not.toContainText('@')
    expect((await latestDemoWorkout(page)).sets[0].weight).toBe(0)
  })

  test('suggestions in the exercise list match the workout type', async ({ page }) => {
    const options = () => page.locator('#exercises option').evaluateAll(opts => opts.map(o => o.value))
    expect(await options()).toEqual(EXERCISE_SUGGESTIONS.Push)

    await startWorkout(page, { type: 'Legs' })
    expect(await options()).toEqual(EXERCISE_SUGGESTIONS.Legs)

    await startWorkout(page, { type: 'Rest' })
    expect(await options()).toEqual([])
  })

  test('multi-equipment exercise shows an equipment picker defaulting to the first option', async ({ page }) => {
    await exerciseInput(page).fill('Bench Press')
    await expect(equipmentSelect(page)).toHaveValue('Barbell')
    await expect(equipmentSelect(page).locator('option')).toHaveText(['Barbell', 'Dumbbells', 'Smith Machine'])

    await addSet(page, { equipment: 'Dumbbells', reps: 10, weight: 30 })
    await expect(logSetRows(page, 'Bench Press').first()).toContainText('· Dumbbells')
  })

  test('switching exercise resets the equipment options', async ({ page }) => {
    await exerciseInput(page).fill('Bench Press')
    await equipmentSelect(page).selectOption('Smith Machine')
    await exerciseInput(page).fill('Squat')
    await expect(equipmentSelect(page).locator('option')).toHaveText(['Barbell', 'Smith Machine'])
    await expect(equipmentSelect(page)).toHaveValue('Barbell')
  })

  test('single-equipment exercise has no picker but still records equipment', async ({ page }) => {
    await exerciseInput(page).fill('Tricep Pushdown')
    await expect(equipmentSelect(page)).toHaveCount(0)
    await addSet(page, { reps: 12, weight: 25 })
    await expect(logSetRows(page, 'Tricep Pushdown').first()).toContainText('· Cable Machine')
  })

  test('a custom exercise not in the library can be logged without equipment', async ({ page }) => {
    await addSet(page, { exercise: 'Sled Push', reps: 4, weight: 120 })
    await expect(equipmentSelect(page)).toHaveCount(0)
    const row = logSetRows(page, 'Sled Push').first()
    await expect(row).toHaveText('S14 reps@ 120kg×')
  })

  test('sets are grouped per exercise and numbered within each group', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 60 })
    await addSet(page, { reps: 8, weight: 62.5 })
    await addSet(page, { exercise: 'Overhead Press', reps: 10, weight: 40 })
    await addSet(page, { exercise: 'Bench Press', reps: 6, weight: 65 })

    await expect(page.locator('h3')).toHaveText(['BENCH PRESS', 'OVERHEAD PRESS'])
    await expect(logSetRows(page, 'Bench Press')).toHaveText([/^S18 reps@ 60kg/, /^S28 reps@ 62.5kg/, /^S36 reps@ 65kg/])
    await expect(logSetRows(page, 'Overhead Press')).toHaveText([/^S110 reps@ 40kg/])

    // set_number is stored per exercise
    const stored = (await latestDemoWorkout(page)).sets
    expect(stored.map(s => [s.exercise, s.set_number])).toEqual([
      ['Bench Press', 1], ['Bench Press', 2], ['Overhead Press', 1], ['Bench Press', 3],
    ])
  })

  test('deleting a set removes it from the page and from storage', async ({ page }) => {
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 60 })
    await addSet(page, { reps: 6, weight: 70 })
    const rows = logSetRows(page, 'Bench Press')
    await rows.first().getByRole('button', { name: '×' }).click()
    await expect(rows).toHaveCount(1)
    await expect(rows.first()).toHaveText(/^S16 reps@ 70kg/)

    expect((await latestDemoWorkout(page)).sets.map(s => s.weight)).toEqual([70])

    await rows.first().getByRole('button', { name: '×' }).click()
    await expect(page.locator('h3')).toHaveCount(0)
    await expect(page.getByText('No sets yet — add your first one above!')).toBeVisible()
  })

  test('a set needs reps', async ({ page }) => {
    await exerciseInput(page).fill('Bench Press')
    await weightInput(page).fill('60')
    await addSetButton(page).click()
    // Then add a valid set: exactly one row proves the first submit was ignored.
    await addSet(page, { reps: 5 })
    await expect(logSetRows(page, 'Bench Press')).toHaveCount(1)
    await expect(logSetRows(page, 'Bench Press').first()).toContainText('5 reps')
  })

  test('a set needs an exercise', async ({ page }) => {
    await repsInput(page).fill('5')
    await addSetButton(page).click()
    await expect(repsInput(page)).toHaveValue('5') // not cleared → not saved
    await expect(page.getByText('No sets yet — add your first one above!')).toBeVisible()
  })

  test('reps must be at least 1', async ({ page }) => {
    await exerciseInput(page).fill('Bench Press')
    await repsInput(page).fill('0')
    await addSetButton(page).click()
    expect(await repsInput(page).evaluate(el => el.validity.rangeUnderflow)).toBe(true)
    await expect(page.getByText('No sets yet — add your first one above!')).toBeVisible()
  })

  test('logged sets appear in History under the workout', async ({ page }) => {
    const note = uniqueNote()
    await startWorkout(page, { type: 'Push', note })
    await addSet(page, { exercise: 'Bench Press', reps: 8, weight: 62.5 })
    await addSet(page, { reps: 7, weight: 62.5 })

    await tab(page, 'History').click()
    const card = historyCard(page, note)
    await expect(cardSetCount(card)).toHaveText('2SETS')
    await cardHeader(card).click()
    await expect(card.getByText('BENCH PRESS', { exact: true })).toBeVisible()
    await expect(card).toContainText('S1 8r 62.5kg · Barbell')
    await expect(card).toContainText('S2 7r 62.5kg · Barbell')
  })
})

test('demo mode never contacts Supabase', async ({ page, supabaseRequests }) => {
  const note = await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 8, weight: 60 }] })
  await logSetRows(page, 'Bench Press').first().getByRole('button', { name: '×' }).click()
  await tab(page, 'History').click()
  await cardHeader(historyCard(page, 'Felt strong')).click()
  await page.getByRole('button', { name: /DELETE WORKOUT/ }).click()
  await page.getByRole('button', { name: 'DELETE', exact: true }).click()
  await tab(page, 'Progress').click()
  await tab(page, 'Home').click()
  expect(note).toBeTruthy()
  expect(supabaseRequests.map(r => r.url())).toEqual([])
})
