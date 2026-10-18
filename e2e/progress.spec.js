import { test, expect } from './support/fixtures.js'
import { openDemo, tab, setDemoWorkouts, logWorkout } from './support/helpers.js'

// Unique exercises in the demo seed (src/lib/demo.js), alphabetical.
const SEED_EXERCISES = [
  'Barbell Row', 'Bench Press', 'Bicep Curl', 'Calf Raise', 'Deadlift', 'Incline Dumbbell Press',
  'Lat Pulldown', 'Lateral Raise', 'Leg Press', 'Overhead Press', 'Pull-Up', 'Romanian Deadlift',
  'Squat', 'Treadmill Run', 'Tricep Pushdown',
]

const picker = page => page.getByText('SELECT EXERCISE').locator('..').getByRole('button')
const pick = (page, name) => page.getByText('SELECT EXERCISE').locator('..').getByRole('button', { name, exact: true })
const tile = (page, label) => page.getByText(label, { exact: true }).locator('..')
const sessionRows = page => page.getByText('SESSIONS', { exact: true }).locator('xpath=following-sibling::div')
const chartPoints = page => page.locator('svg circle')

async function openProgress(page) {
  await tab(page, 'Progress').click()
  await expect(page.getByRole('heading', { name: 'Progress' })).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await openDemo(page)
})

test('lists every logged exercise alphabetically, none selected', async ({ page }) => {
  await openProgress(page)
  await expect(picker(page)).toHaveText(SEED_EXERCISES)
  await expect(page.getByText('↑ Select an exercise to see your progress')).toBeVisible()
  await expect(page.getByText('BEST WEIGHT')).toHaveCount(0)
})

test('selecting an exercise shows best weight, total sets, chart and sessions', async ({ page }) => {
  await openProgress(page)
  await pick(page, 'Bench Press').click()
  await expect(pick(page, 'Bench Press')).toHaveCSS('background-color', 'rgb(255, 107, 43)')
  await expect(page.getByText('↑ Select an exercise')).toBeHidden()

  // Bench Press in the seed: 4 sessions, 11 sets, heaviest 85kg
  await expect(tile(page, 'BEST WEIGHT')).toHaveText('85kgBEST WEIGHT')
  await expect(tile(page, 'TOTAL SETS')).toHaveText('11TOTAL SETS')

  await expect(page.getByText('MAX WEIGHT OVER TIME')).toBeVisible()
  await expect(chartPoints(page)).toHaveCount(4)
  // Points are oldest → newest, each labelled with that session's max
  await expect(page.locator('svg text')).toHaveText(['Sep 29', '77.5', 'Oct 3', '65', 'Oct 10', '80', 'Oct 17', '85'])

  await expect(sessionRows(page)).toHaveText([
    'Sat, Oct 1785kgMAX3SETS',
    'Sat, Oct 1080kgMAX3SETS',
    'Sat, Oct 365kgMAX2SETS',
    'Tue, Sep 2977.5kgMAX3SETS',
  ])
})

test('an exercise with a single session has no chart', async ({ page }) => {
  await openProgress(page)
  await pick(page, 'Tricep Pushdown').click()
  await expect(tile(page, 'BEST WEIGHT')).toHaveText('32.5kgBEST WEIGHT')
  await expect(page.getByText('MAX WEIGHT OVER TIME')).toHaveCount(0)
  await expect(sessionRows(page)).toHaveCount(1)
})

test('a bodyweight exercise has a best weight of 0', async ({ page }) => {
  await openProgress(page)
  await pick(page, 'Pull-Up').click()
  await expect(tile(page, 'BEST WEIGHT')).toHaveText('0kgBEST WEIGHT')
  await expect(tile(page, 'TOTAL SETS')).toHaveText('3TOTAL SETS')
})

test('switching exercise updates the stats', async ({ page }) => {
  await openProgress(page)
  await pick(page, 'Bench Press').click()
  await pick(page, 'Deadlift').click()
  await expect(tile(page, 'BEST WEIGHT')).toHaveText('145kgBEST WEIGHT')
  await expect(tile(page, 'TOTAL SETS')).toHaveText('5TOTAL SETS')
  await expect(sessionRows(page)).toHaveCount(2)
})

test('a new personal best shows up after logging it', async ({ page }) => {
  await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 3, weight: 100 }] })
  await openProgress(page)
  await pick(page, 'Bench Press').click()
  await expect(tile(page, 'BEST WEIGHT')).toHaveText('100kgBEST WEIGHT')
  await expect(tile(page, 'TOTAL SETS')).toHaveText('12TOTAL SETS')
  await expect(chartPoints(page)).toHaveCount(5)
  await expect(sessionRows(page).first()).toHaveText('Sun, Oct 18100kgMAX1SETS')
})

test('a newly logged exercise is added to the list', async ({ page }) => {
  await logWorkout(page, { sets: [{ exercise: 'Sled Push', reps: 4, weight: 120 }] })
  await openProgress(page)
  await expect(picker(page)).toHaveText([...SEED_EXERCISES, 'Sled Push'].sort())
})

test('a new user sees an empty state', async ({ page }) => {
  await setDemoWorkouts(page, [])
  await openProgress(page)
  await expect(page.getByText('Log some workouts to see your progress here.')).toBeVisible()
  await expect(page.getByText('SELECT EXERCISE')).toHaveCount(0)
})

test.describe('mixed kg and lbs', () => {
  test('a lighter lift in lbs does not beat a heavier one in kg', async ({ page }) => {
    await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 5, weight: 150, unit: 'lbs' }] })
    await openProgress(page)
    await pick(page, 'Bench Press').click()
    // 150 lbs ≈ 68 kg, so the seeded 85kg is still the best lift.
    await expect(tile(page, 'BEST WEIGHT')).toHaveText('85kgBEST WEIGHT')
    // Each session keeps its own unit
    await expect(sessionRows(page).first()).toHaveText('Sun, Oct 18150lbsMAX1SETS')
    await expect(sessionRows(page).nth(1)).toHaveText('Sat, Oct 1785kgMAX3SETS')
  })

  test('a heavier lift in lbs is the best weight, shown in lbs', async ({ page }) => {
    // 200 lbs ≈ 90.7 kg > 85 kg
    await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 2, weight: 200, unit: 'lbs' }] })
    await openProgress(page)
    await pick(page, 'Bench Press').click()
    await expect(tile(page, 'BEST WEIGHT')).toHaveText('200lbsBEST WEIGHT')
  })

  test('within one session the heaviest set wins after converting units', async ({ page }) => {
    // 190 lbs ≈ 86.2 kg; 100 kg is heaviest. The raw biggest number (190) must not win.
    await logWorkout(page, { sets: [
      { exercise: 'Bench Press', reps: 3, weight: 86 },
      { reps: 3, weight: 190, unit: 'lbs' },
      { reps: 3, weight: 100, unit: 'kg' },
    ] })
    await openProgress(page)
    await pick(page, 'Bench Press').click()
    await expect(sessionRows(page).first()).toHaveText('Sun, Oct 18100kgMAX3SETS')
  })

  test('the chart plots by real weight and labels units when they are mixed', async ({ page }) => {
    await logWorkout(page, { sets: [{ exercise: 'Bench Press', reps: 5, weight: 150, unit: 'lbs' }] })
    await openProgress(page)
    await pick(page, 'Bench Press').click()
    await expect(page.locator('svg text')).toHaveText([
      'Sep 29', '77.5kg', 'Oct 3', '65kg', 'Oct 10', '80kg', 'Oct 17', '85kg', 'Oct 18', '150lbs',
    ])
    // Higher on the chart = smaller cy. 150lbs (68kg) sits between 65kg and 77.5kg.
    const ys = await chartPoints(page).evaluateAll(cs => cs.map(c => Number(c.getAttribute('cy'))))
    const [sep29, oct3, , oct17, oct18] = ys
    expect(oct18).toBeLessThan(oct3)
    expect(oct18).toBeGreaterThan(sep29)
    expect(oct18).toBeGreaterThan(oct17)
  })
})
