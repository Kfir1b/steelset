import { expect } from './fixtures.js'

// Local noon on Sunday 2026-10-18 in Asia/Jerusalem (the configured timezone).
// Demo seed data is laid out relative to "now", so freezing it makes every
// date, sort order and "this week" count deterministic.
export const NOW = new Date('2026-10-18T12:00:00+03:00')
export const TODAY = '2026-10-18'

export const DEMO_DATA_KEY = 'steelset_demo_data'

/** Open the app in demo mode at `path` with the clock frozen at NOW. */
export async function openDemo(page, path = '/', { clock = NOW } = {}) {
  if (clock) await page.clock.setFixedTime(clock)
  await page.goto(`${path}${path.includes('?') ? '&' : '?'}demo=1`)
  await expect(page.getByText('DEMO MODE — SAMPLE DATA, NOTHING IS SAVED')).toBeVisible()
}

/** Replace the demo store (e.g. with [] for a brand-new user) and reload. */
export async function setDemoWorkouts(page, workouts) {
  await page.evaluate(([key, w]) => sessionStorage.setItem(key, JSON.stringify(w)), [DEMO_DATA_KEY, workouts])
  await page.reload()
}

export const readDemoWorkouts = page =>
  page.evaluate(key => JSON.parse(sessionStorage.getItem(key)), DEMO_DATA_KEY)

export const nav = page => page.getByRole('navigation')
export const tab = (page, label) => nav(page).getByRole('button', { name: new RegExp(`${label}$`) })

export const uniqueNote = () => `e2e ${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`

// ── Log page ──────────────────────────────────────────
export const exerciseInput = page => page.getByPlaceholder('e.g. Bench Press', { exact: true })
export const repsInput = page => page.getByPlaceholder('10', { exact: true })
export const weightInput = page => page.getByPlaceholder('60', { exact: true })
export const unitSelect = page => page.locator('select:has(option:text-is("lbs"))')
export const equipmentSelect = page => page.locator('select:not(:has(option:text-is("lbs")))')
export const addSetButton = page => page.locator('form button[type="submit"]')

/** Rows under an exercise group heading on the Log page. */
export const logSetRows = (page, exercise) =>
  page.locator('h3', { hasText: new RegExp(`^${exercise.toUpperCase()}$`) }).locator('xpath=following-sibling::div[1]/div')

export async function startWorkout(page, { type, date, note } = {}) {
  // Leave /log first so the page remounts with a fresh start form.
  if (new URL(page.url()).pathname === '/log') await tab(page, 'Home').click()
  await tab(page, 'Log').click()
  await expect(page.getByRole('heading', { name: 'Log Workout' })).toBeVisible()
  if (type) await page.getByRole('button', { name: type, exact: true }).click()
  if (date) await page.locator('input[type="date"]').fill(date)
  if (note) await page.getByPlaceholder('How are you feeling today?').fill(note)
  await page.getByRole('button', { name: /START WORKOUT/ }).click()
  await expect(page.getByRole('heading', { name: 'Add Sets' })).toBeVisible()
}

/** Fill the add-set form and submit; waits until the app accepted the set. */
export async function addSet(page, { exercise, reps, weight, unit, equipment }) {
  if (exercise !== undefined) await exerciseInput(page).fill(exercise)
  if (equipment) await equipmentSelect(page).selectOption(equipment)
  if (reps !== undefined) await repsInput(page).fill(String(reps))
  if (weight !== undefined) await weightInput(page).fill(String(weight))
  if (unit) await unitSelect(page).selectOption(unit)
  await addSetButton(page).click()
  // The app clears reps/weight only after a successful save.
  await expect(repsInput(page)).toHaveValue('')
}

/** Start a workout and add the given sets. Returns the workout's unique note. */
export async function logWorkout(page, { type = 'Push', date, note = uniqueNote(), sets = [] } = {}) {
  await startWorkout(page, { type, date, note })
  for (const set of sets) await addSet(page, set)
  return note
}

// ── History page ──────────────────────────────────────
export const historyCards = page => page.locator('.fade-up')
/** The History card (header + expanded sets) whose text includes `text`. */
export const historyCard = (page, text) => page.locator('.fade-up', { hasText: text })
export const cardHeader = card => card.locator(':scope > div').first()
/** The "N SETS" counter in a History card header, e.g. "3SETS". */
export const cardSetCount = card => cardHeader(card).getByText('SETS', { exact: true }).locator('..')

/** The most recently created demo workout (createWorkout appends to the store). */
export const latestDemoWorkout = async page => (await readDemoWorkouts(page)).at(-1)
