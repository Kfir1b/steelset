// Runs against the "unconfigured" server (no Supabase URL/key), see playwright.config.js.
import { test, expect } from './support/fixtures.js'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('shows the setup screen instead of the app', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Connect your database' })).toBeVisible()
  await expect(page.getByText('SETUP REQUIRED')).toBeVisible()
  await expect(page.getByRole('navigation')).toHaveCount(0)
})

test('every route shows the setup screen, even the demo link', async ({ page }) => {
  for (const path of ['/auth', '/history', '/?demo=1']) {
    await page.goto(path)
    await expect(page.getByRole('heading', { name: 'Connect your database' })).toBeVisible()
  }
})

for (const [label, url, key] of [
  ['empty fields', '', ''],
  ['a non-https URL', 'http://abc.supabase.co', 'eyJhbGciOi'],
  ['a key that is not a Supabase key', 'https://abc.supabase.co', 'not-a-key'],
]) {
  test(`rejects ${label}`, async ({ page }) => {
    await page.getByPlaceholder('https://abcdefgh.supabase.co').fill(url)
    await page.getByPlaceholder('eyJhbGciOiJIUzI1NiIsInR5cCI6...').fill(key)
    const alerts = []
    page.once('dialog', d => { alerts.push(d.message()); d.accept() })
    await page.getByRole('button', { name: 'SHOW ME WHAT TO DO →' }).click()
    await expect.poll(() => alerts).toEqual(['Please enter valid Supabase credentials.'])
    await expect(page.getByText('✓ Almost there!')).toHaveCount(0)
  })
}

for (const key of ['eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30', 'sb_publishable_abcdefghijklmnopqrstuvwxyz']) {
  test(`accepts a ${key.slice(0, 3)}… key and shows what to paste`, async ({ page }) => {
    await page.getByPlaceholder('https://abcdefgh.supabase.co').fill('https://abc.supabase.co')
    await page.getByPlaceholder('eyJhbGciOiJIUzI1NiIsInR5cCI6...').fill(key)
    await page.getByRole('button', { name: 'SHOW ME WHAT TO DO →' }).click()
    await expect(page.getByText('✓ Almost there!')).toBeVisible()
    await expect(page.getByText("const SUPABASE_URL = 'https://abc.supabase.co'")).toBeVisible()
    // Only the first 20 characters of the key are echoed back
    await expect(page.getByText(`const SUPABASE_ANON_KEY = '${key.slice(0, 20)}...'`)).toBeVisible()
  })
}
