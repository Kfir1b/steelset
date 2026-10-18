import { test, expect } from './support/fixtures.js'
import { openDemo } from './support/helpers.js'
import { EXERCISES, WORKOUT_TIPS } from '../src/data/exercises.js'

const NAMES = Object.keys(EXERCISES)
const counter = page => page.getByText(/^\d+ EXERCISES$/)
const search = page => page.getByPlaceholder('Search exercise or muscle...')
const card = (page, name) => page.getByText(name, { exact: true })
const category = (page, cat) => page.getByRole('button', { name: cat, exact: true })

test.beforeEach(async ({ page }) => {
  await openDemo(page, '/exercises')
  await expect(page.getByRole('heading', { name: 'Exercise Library' })).toBeVisible()
})

test('lists every exercise in the library', async ({ page }) => {
  await expect(page.getByText(`${NAMES.length} exercises · form guides · anatomy · video`)).toBeVisible()
  await expect(counter(page)).toHaveText(`${NAMES.length} EXERCISES`)
  for (const name of NAMES) await expect(card(page, name)).toHaveCount(1)
})

test('a card shows category, difficulty, equipment and muscles', async ({ page }) => {
  const bench = page.locator('.fade-up', { has: card(page, 'Bench Press') })
  await expect(bench).toContainText('PUSH')
  await expect(bench).toContainText('INTERMEDIATE')
  await expect(bench).toContainText('Barbell / Dumbbells / Smith Machine · Pectoralis Major · Anterior Deltoid, Triceps')
  await expect(bench).toContainText(EXERCISES['Bench Press'].description)
})

test('shows the coaching tips', async ({ page }) => {
  for (const tip of Object.values(WORKOUT_TIPS)) {
    await expect(page.getByText(tip.title, { exact: true })).toBeVisible()
  }
})

test('search by name filters the list', async ({ page }) => {
  await search(page).fill('bench')
  await expect(counter(page)).toHaveText('2 EXERCISES')
  await expect(card(page, 'Bench Press')).toBeVisible()
  await expect(card(page, 'Close-Grip Bench Press')).toBeVisible()
  await expect(card(page, 'Deadlift')).toHaveCount(0)
})

test('search is case-insensitive', async ({ page }) => {
  await search(page).fill('BeNcH')
  await expect(counter(page)).toHaveText('2 EXERCISES')
})

test('search also matches primary muscles', async ({ page }) => {
  await search(page).fill('quad')
  // "Leg Extension" doesn't contain "quad" but its primary muscle is Quadriceps.
  await expect(card(page, 'Leg Extension')).toBeVisible()
  await expect(card(page, 'Squat')).toBeVisible()
  await expect(card(page, 'Bench Press')).toHaveCount(0)
  await expect(counter(page)).toHaveText('13 EXERCISES')
})

test('a search with no matches shows zero results', async ({ page }) => {
  await search(page).fill('zzzz')
  await expect(counter(page)).toHaveText('0 EXERCISES')
  await expect(page.locator('.fade-up')).toHaveCount(0)
})

test('clearing the search restores the full list', async ({ page }) => {
  await search(page).fill('bench')
  await search(page).fill('')
  await expect(counter(page)).toHaveText(`${NAMES.length} EXERCISES`)
})

for (const cat of ['Push', 'Pull', 'Legs', 'Full', 'Cardio']) {
  test(`category ${cat} shows only ${cat} exercises`, async ({ page }) => {
    const expected = NAMES.filter(n => EXERCISES[n].category === cat)
    const others = NAMES.filter(n => EXERCISES[n].category !== cat)
    await category(page, cat.toUpperCase()).click()
    await expect(counter(page)).toHaveText(`${expected.length} EXERCISES`)
    await expect(card(page, expected[0])).toBeVisible()
    await expect(card(page, others[0])).toHaveCount(0)
  })
}

test('category and search combine', async ({ page }) => {
  await category(page, 'PUSH').click()
  await search(page).fill('bench')
  await expect(counter(page)).toHaveText('2 EXERCISES')
  await category(page, 'LEGS').click()
  await expect(counter(page)).toHaveText('0 EXERCISES')
  await category(page, 'ALL').click()
  await expect(counter(page)).toHaveText('2 EXERCISES')
})

test.describe('exercise detail', () => {
  const ex = EXERCISES['Bench Press']

  test.beforeEach(async ({ page }) => {
    await card(page, 'Bench Press').click()
    await expect(page.getByRole('heading', { name: 'Bench Press', level: 1 })).toBeVisible()
  })

  test('shows category, equipment, muscles and description', async ({ page }) => {
    await expect(page.getByText('PUSH · BARBELL / DUMBBELLS / SMITH MACHINE')).toBeVisible()
    await expect(page.getByText('MUSCLES WORKED')).toBeVisible()
    // Common names with the anatomical name underneath; no common name → just the name
    await expect(page.getByText('ChestPectoralis Major', { exact: true })).toBeVisible()
    await expect(page.getByText('Front DeltAnterior Deltoid', { exact: true })).toBeVisible()
    await expect(page.getByText('Triceps', { exact: true })).toBeVisible()
    await expect(page.getByText(ex.description, { exact: true })).toBeVisible()
  })

  test('embeds the tutorial video', async ({ page }) => {
    const video = page.locator('iframe[title="Bench Press tutorial"]')
    await expect(video).toHaveAttribute('src', `https://www.youtube.com/embed/${ex.videoId}?rel=0&modestbranding=1`)
  })

  test('hides the hero image if it fails to load', async ({ page }) => {
    // External requests are blocked in tests, so the Unsplash image errors out.
    await expect(page.getByRole('img', { name: 'Bench Press' })).toBeHidden()
  })

  test('form cues, mistakes and pro tip tabs', async ({ page }) => {
    for (const cue of ex.formCues) await expect(page.getByText(cue, { exact: true })).toBeVisible()

    await page.getByRole('button', { name: '⚠ Mistakes' }).click()
    for (const m of ex.commonMistakes) await expect(page.getByText(m, { exact: true })).toBeVisible()
    await expect(page.getByText(ex.formCues[0], { exact: true })).toBeHidden()

    await page.getByRole('button', { name: '💡 Pro Tip' }).click()
    await expect(page.getByText(ex.proTip)).toBeVisible()
    await expect(page.getByText(ex.commonMistakes[0], { exact: true })).toBeHidden()

    await page.getByRole('button', { name: '✓ Form Cues' }).click()
    await expect(page.getByText(ex.formCues[0], { exact: true })).toBeVisible()
  })

  test('back returns to the list', async ({ page }) => {
    await page.getByRole('button', { name: '← BACK' }).click()
    await expect(page.getByRole('heading', { name: 'Exercise Library' })).toBeVisible()
    await expect(counter(page)).toHaveText(`${NAMES.length} EXERCISES`)
  })
})

test('back from a detail keeps the search and category', async ({ page }) => {
  await category(page, 'PUSH').click()
  await search(page).fill('bench')
  await card(page, 'Close-Grip Bench Press').click()
  await page.getByRole('button', { name: '← BACK' }).click()
  await expect(search(page)).toHaveValue('bench')
  await expect(counter(page)).toHaveText('2 EXERCISES')
})

test('every exercise detail page renders', async ({ page }) => {
  test.slow()
  for (const name of NAMES) {
    await search(page).fill(name)
    await card(page, name).click()
    await expect(page.getByRole('heading', { name, level: 1, exact: true })).toBeVisible()
    await expect(page.getByText(EXERCISES[name].formCues[0], { exact: true })).toBeVisible()
    await page.getByRole('button', { name: '← BACK' }).click()
  }
})
