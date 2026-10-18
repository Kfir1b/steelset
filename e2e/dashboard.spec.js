import { test, expect } from './support/fixtures.js'
import { openDemo, tab, setDemoWorkouts, logWorkout, historyCards, DEMO_DATA_KEY } from './support/helpers.js'

/** A stat tile's text, e.g. "4SESSIONSThis Week". */
const stat = (page, label) => page.getByText(label, { exact: true }).locator('..')
const recentCards = page => page.locator('.fade-up')

test.beforeEach(async ({ page }) => {
  await openDemo(page)
})

test('header shows today and a logout button', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  await expect(page.getByText('SUNDAY, OCTOBER 18', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'LOGOUT' })).toBeVisible()
})

test('stats summarize the seeded workouts', async ({ page }) => {
  // Seed: 10 workouts, 67 sets; 4 of them within the last 7 days (1, 3, 5, 6 days ago).
  await expect(stat(page, 'This Week')).toHaveText('4SESSIONSThis Week')
  await expect(stat(page, 'Total')).toHaveText('10WORKOUTSTotal')
  await expect(stat(page, 'Total Sets')).toHaveText('67SETSTotal Sets')
})

test('recent shows the 5 newest workouts with their set counts', async ({ page }) => {
  const cards = recentCards(page)
  await expect(cards).toHaveCount(5)
  await expect(cards).toHaveText([
    'Push DaySat, Oct 1710SETS',
    'Pull DayThu, Oct 1511SETS',
    'Legs DayTue, Oct 1311SETS',
    'Cardio DayMon, Oct 121SETS',
    'Push DaySat, Oct 107SETS',
  ])
})

test('stats and recent list update after logging a workout', async ({ page }) => {
  await logWorkout(page, {
    type: 'Legs',
    sets: [{ exercise: 'Squat', reps: 5, weight: 100 }, { reps: 5, weight: 100 }],
  })
  await tab(page, 'Home').click()
  await expect(stat(page, 'This Week')).toHaveText('5SESSIONSThis Week')
  await expect(stat(page, 'Total')).toHaveText('11WORKOUTSTotal')
  await expect(stat(page, 'Total Sets')).toHaveText('69SETSTotal Sets')
  await expect(recentCards(page)).toHaveCount(5)
  await expect(recentCards(page).first()).toHaveText('Legs DaySun, Oct 182SETS')
})

test('"Log Today\'s Workout" opens the Log page', async ({ page }) => {
  await page.getByRole('button', { name: /Log Today's Workout/ }).click()
  await expect(page).toHaveURL(/\/log$/)
  await expect(page.getByRole('heading', { name: 'Log Workout' })).toBeVisible()
})

test('clicking a recent workout opens it expanded in History', async ({ page }) => {
  await recentCards(page).nth(1).click() // Pull, Oct 15
  await expect(page).toHaveURL(/\/history$/)
  const card = historyCards(page).nth(1)
  await expect(card).toContainText('Pull DayThu, Oct 15, 2026')
  await expect(card.getByText('DEADLIFT', { exact: true })).toBeVisible()
  await expect(card.getByRole('button', { name: /DELETE WORKOUT/ })).toBeVisible()
  // and it's the only one expanded
  await expect(page.getByRole('button', { name: /DELETE WORKOUT/ })).toHaveCount(1)
})

test('opening an older recent workout scrolls it into view in History', async ({ page }) => {
  await recentCards(page).nth(4).click() // Push, Oct 10: below the fold on a phone
  const card = historyCards(page).nth(4)
  await expect(card.getByRole('button', { name: /DELETE WORKOUT/ })).toBeVisible()
  await expect(card).toBeInViewport()
  const scrolled = () => page.evaluate(() => document.querySelector('nav').previousElementSibling.scrollTop)
  await expect.poll(scrolled).toBeGreaterThan(0)
})

test('corrupt demo data is treated as no data instead of crashing', async ({ page }) => {
  await page.evaluate(k => sessionStorage.setItem(k, '{not json'), DEMO_DATA_KEY)
  await page.reload()
  await expect(stat(page, 'Total')).toHaveText('0WORKOUTSTotal')
  await expect(page.getByText('No workouts yet.Start logging!')).toBeVisible()
})

test('a new user sees zero stats and an empty recent list', async ({ page }) => {
  await setDemoWorkouts(page, [])
  await expect(stat(page, 'This Week')).toHaveText('0SESSIONSThis Week')
  await expect(stat(page, 'Total')).toHaveText('0WORKOUTSTotal')
  await expect(stat(page, 'Total Sets')).toHaveText('0SETSTotal Sets')
  await expect(page.getByText('No workouts yet.Start logging!')).toBeVisible()
})

test('logout ends the demo and returns to sign-in', async ({ page }) => {
  await page.getByRole('button', { name: 'LOGOUT' }).click()
  await expect(page).toHaveURL(/\/auth$/)
  await expect(page.getByRole('button', { name: 'SIGN IN' })).toBeVisible()
  expect(await page.evaluate(k => [sessionStorage.getItem('steelset_demo'), sessionStorage.getItem(k)], DEMO_DATA_KEY))
    .toEqual([null, null])

  // The app is locked again
  await page.goto('/')
  await expect(page).toHaveURL(/\/auth$/)
})
