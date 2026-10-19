import { test, expect } from './support/fixtures.js'
import {
  openDemo, tab, setDemoWorkouts, logWorkout, uniqueNote,
  historyCards, historyCard, cardHeader, cardSetCount, readDemoWorkouts,
} from './support/helpers.js'

const CONFIRM_TEXT = 'Delete this workout and all its sets?'

// Seed data (src/lib/demo.js PLAN) with the clock frozen at Sun 2026-10-18:
// newest first, one card per workout: [type, date, number of sets].
const SEED_ORDER = [
  ['Push', 'Sat, Oct 17, 2026', 10],
  ['Pull', 'Thu, Oct 15, 2026', 11],
  ['Legs', 'Tue, Oct 13, 2026', 11],
  ['Cardio', 'Mon, Oct 12, 2026', 1],
  ['Push', 'Sat, Oct 10, 2026', 7],
  ['Pull', 'Thu, Oct 8, 2026', 7],
  ['Legs', 'Tue, Oct 6, 2026', 5],
  ['Full', 'Sat, Oct 3, 2026', 6],
  ['Push', 'Tue, Sep 29, 2026', 5],
  ['Legs', 'Sat, Sep 26, 2026', 4],
]

test.beforeEach(async ({ page }) => {
  await openDemo(page, '/history')
  await expect(page.getByRole('heading', { name: 'History' })).toBeVisible()
})

test('lists all workouts newest first with type, date and set count', async ({ page }) => {
  const cards = historyCards(page)
  await expect(cards).toHaveCount(SEED_ORDER.length)
  for (const [i, [type, date, sets]] of SEED_ORDER.entries()) {
    await expect(cards.nth(i)).toContainText(`${type} Day${date}`)
    await expect(cardSetCount(cards.nth(i))).toHaveText(`${sets}SETS`)
  }
  await expect(cards.first()).toContainText('"Felt strong, added 2.5kg to bench."')
})

test('a workout without notes shows no notes line', async ({ page }) => {
  // 2nd seed workout (Pull, Oct 15) has empty notes
  await expect(historyCards(page).nth(1)).toHaveText(/^Pull DayThu, Oct 15, 2026\d+SETS$/)
})

for (const [filter, count] of [['PUSH', 3], ['PULL', 2], ['LEGS', 3], ['FULL', 1], ['CARDIO', 1]]) {
  test(`filter ${filter} shows only ${filter.toLowerCase()} workouts`, async ({ page }) => {
    await page.getByRole('button', { name: filter, exact: true }).click()
    const cards = historyCards(page)
    await expect(cards).toHaveCount(count)
    const type = filter[0] + filter.slice(1).toLowerCase()
    for (let i = 0; i < count; i++) await expect(cards.nth(i)).toContainText(`${type} Day`)
  })
}

test('filters are offered for every type except Rest', async ({ page }) => {
  await expect(page.locator('.hide-scrollbar button')).toHaveText(['ALL', 'PUSH', 'PULL', 'LEGS', 'FULL', 'CARDIO'])
})

test('a Rest-day workout is listed under ALL', async ({ page }) => {
  const note = await logWorkout(page, { type: 'Rest' })
  await tab(page, 'History').click()
  await expect(historyCards(page).first()).toContainText(`Rest DaySun, Oct 18, 2026"${note}"`)
})

test('ALL filter restores the full list', async ({ page }) => {
  await page.getByRole('button', { name: 'CARDIO', exact: true }).click()
  await expect(historyCards(page)).toHaveCount(1)
  await page.getByRole('button', { name: 'ALL', exact: true }).click()
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length)
})

test('expanding a workout shows its sets grouped by exercise, in order', async ({ page }) => {
  const card = historyCards(page).first()
  await expect(card.getByText('BENCH PRESS', { exact: true })).toBeHidden()

  await cardHeader(card).click()
  for (const ex of ['BENCH PRESS', 'OVERHEAD PRESS', 'INCLINE DUMBBELL PRESS', 'TRICEP PUSHDOWN']) {
    await expect(card.getByText(ex, { exact: true })).toBeVisible()
  }
  const bench = card.getByText('BENCH PRESS', { exact: true }).locator('xpath=following-sibling::div[1]/div')
  await expect(bench).toHaveText(['S1 8r 80kg · Barbell', 'S2 8r 80kg · Barbell', 'S3 6r 85kg · Barbell'])
})

test('sets are shown in set-number order, whatever order they were stored in', async ({ page }) => {
  const set = (id, set_number, reps, weight) =>
    ({ id, workout_id: 'w-x', exercise: 'Bench Press', set_number, reps, weight, unit: 'kg', equipment: 'Barbell' })
  await setDemoWorkouts(page, [{
    id: 'w-x', user_id: 'demo-user', date: '2026-10-18', type: 'Push', notes: '', created_at: '2026-10-18T09:00:00.000Z',
    sets: [set('c', 3, 5, 75), set('a', 1, 8, 60), set('b', 2, 6, 70)],
  }])
  const card = historyCards(page).first()
  await cardHeader(card).click()
  const bench = card.getByText('BENCH PRESS', { exact: true }).locator('xpath=following-sibling::div[1]/div')
  await expect(bench).toHaveText(['S1 8r 60kg · Barbell', 'S2 6r 70kg · Barbell', 'S3 5r 75kg · Barbell'])
})

test('bodyweight sets show no weight', async ({ page }) => {
  const pull = historyCards(page).nth(1) // Pull, Oct 15: Pull-Up sets have weight 0
  await cardHeader(pull).click()
  const pullUps = pull.getByText('PULL-UP', { exact: true }).locator('xpath=following-sibling::div[1]/div')
  await expect(pullUps).toHaveText(['S1 10r · Bodyweight', 'S2 8r · Bodyweight', 'S3 7r · Bodyweight'])
})

test('clicking an expanded workout collapses it', async ({ page }) => {
  const card = historyCards(page).first()
  await cardHeader(card).click()
  await expect(card.getByRole('button', { name: /DELETE WORKOUT/ })).toBeVisible()
  await cardHeader(card).click()
  await expect(card.getByRole('button', { name: /DELETE WORKOUT/ })).toBeHidden()
})

test('only one workout is expanded at a time', async ({ page }) => {
  const [first, second] = [historyCards(page).nth(0), historyCards(page).nth(1)]
  await cardHeader(first).click()
  await cardHeader(second).click()
  await expect(second.getByText('DEADLIFT', { exact: true })).toBeVisible()
  await expect(first.getByText('BENCH PRESS', { exact: true })).toBeHidden()
  await expect(page.getByRole('button', { name: /DELETE WORKOUT/ })).toHaveCount(1)
})

test('a newly logged workout is listed first', async ({ page }) => {
  const note = await logWorkout(page, { type: 'Cardio', sets: [{ exercise: 'Running', reps: 1 }] })
  await tab(page, 'History').click()
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length + 1)
  await expect(historyCards(page).first()).toContainText(`Cardio DaySun, Oct 18, 2026"${note}"`)
})

test('a back-dated workout is sorted into its date position', async ({ page }) => {
  const note = await logWorkout(page, { type: 'Full', date: '2026-10-14', sets: [{ exercise: 'Plank', reps: 1 }] })
  await tab(page, 'History').click()
  // Between Pull (Oct 15) and Legs (Oct 13)
  await expect(historyCards(page).nth(2)).toContainText(note)
  await expect(historyCards(page).nth(2)).toContainText('Wed, Oct 14, 2026')
})

test('delete asks for confirmation, then removes the workout permanently', async ({ page }) => {
  const note = await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 8, weight: 60 }] })
  await tab(page, 'History').click()
  const card = historyCard(page, note)
  await cardHeader(card).click()
  await card.getByRole('button', { name: /DELETE WORKOUT/ }).click()

  await expect(page.getByText(CONFIRM_TEXT)).toBeVisible()
  await page.getByRole('button', { name: 'DELETE', exact: true }).click()

  await expect(page.getByText(CONFIRM_TEXT)).toBeHidden()
  await expect(historyCard(page, note)).toHaveCount(0)
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length)
  expect((await readDemoWorkouts(page)).some(w => w.notes === note)).toBe(false)

  // Still gone after a reload
  await page.reload()
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length)
  await expect(historyCard(page, note)).toHaveCount(0)
})

test('deleting a seeded workout removes only that one', async ({ page }) => {
  await cardHeader(historyCards(page).first()).click()
  await page.getByRole('button', { name: /DELETE WORKOUT/ }).click()
  await page.getByRole('button', { name: 'DELETE', exact: true }).click()
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length - 1)
  await expect(historyCards(page).first()).toContainText('Pull DayThu, Oct 15, 2026')
})

test('cancelling delete keeps the workout', async ({ page }) => {
  const card = historyCards(page).first()
  await cardHeader(card).click()
  await card.getByRole('button', { name: /DELETE WORKOUT/ }).click()
  await page.getByRole('button', { name: 'CANCEL' }).click()
  await expect(page.getByText(CONFIRM_TEXT)).toBeHidden()
  await expect(historyCards(page)).toHaveCount(SEED_ORDER.length)
  // Still expanded
  await expect(card.getByRole('button', { name: /DELETE WORKOUT/ })).toBeVisible()
})

test('a filter with no matches shows an empty state', async ({ page }) => {
  // Full has exactly one seeded workout; delete it, then filter by Full.
  await page.getByRole('button', { name: 'FULL', exact: true }).click()
  await cardHeader(historyCards(page).first()).click()
  await page.getByRole('button', { name: /DELETE WORKOUT/ }).click()
  await page.getByRole('button', { name: 'DELETE', exact: true }).click()
  await expect(page.getByText('No Full workouts found.')).toBeVisible()
})

test('a new user with no workouts sees an empty state', async ({ page }) => {
  await setDemoWorkouts(page, [])
  await expect(page.getByText('No workouts found.')).toBeVisible()
  await expect(historyCards(page)).toHaveCount(0)
})

test('a workout with no sets can be expanded and deleted', async ({ page }) => {
  const note = uniqueNote()
  await logWorkout(page, { note }) // started, but no sets added
  await tab(page, 'History').click()
  const card = historyCard(page, note)
  await expect(cardSetCount(card)).toHaveText('0SETS')
  await cardHeader(card).click()
  await expect(card.getByText('No sets logged.')).toBeVisible()
  await card.getByRole('button', { name: /DELETE WORKOUT/ }).click()
  await page.getByRole('button', { name: 'DELETE', exact: true }).click()
  await expect(historyCard(page, note)).toHaveCount(0)
  expect((await readDemoWorkouts(page)).some(w => w.notes === note)).toBe(false)
})

test('a workout with sets does not show the "no sets" message', async ({ page }) => {
  const card = historyCards(page).first()
  await cardHeader(card).click()
  await expect(card.getByText('BENCH PRESS', { exact: true })).toBeVisible() // panel is open
  await expect(page.getByText('No sets logged.')).toHaveCount(0)
})
