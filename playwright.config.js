import { defineConfig, devices } from '@playwright/test'

const HOST = '127.0.0.1'
const PORT = 5199 // app with (placeholder) Supabase config
const SETUP_PORT = 5198 // app with no Supabase config → SetupPage

// Tests run against a production build (vite build + vite preview), not the dev
// server: under many parallel workers on Windows the dev server's hundreds of
// unbundled module requests and HMR sockets fail intermittently and Vite then
// reloads pages mid-test. A build is also what actually ships. Env vars are
// baked in at build time, so each config gets its own build. Source maps are
// kept for the coverage report.
function previewServer(port, env) {
  const outDir = `node_modules/.cache/e2e/${port}`
  return {
    command: `npx vite build --sourcemap --emptyOutDir --logLevel warn --outDir ${outDir} && npx vite preview --outDir ${outDir} --host ${HOST} --port ${port} --strictPort`,
    url: `http://${HOST}:${port}`,
    reuseExistingServer: false, // never test a stale build
    timeout: 120_000,
    env,
  }
}

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  globalSetup: './e2e/support/global-setup.js',
  globalTeardown: './e2e/support/global-teardown.js',
  use: {
    trace: 'on-first-retry',
    // Pin locale/timezone so date formatting is the same on every machine.
    locale: 'en-US',
    timezoneId: 'Asia/Jerusalem',
  },
  projects: [
    // The app is mobile-first (max-width 480px), so test at phone size.
    {
      name: 'mobile-chrome',
      testIgnore: /setup\.spec\.js/,
      use: { ...devices['Pixel 7'], baseURL: `http://${HOST}:${PORT}` },
    },
    {
      name: 'unconfigured',
      testMatch: /setup\.spec\.js/,
      use: { ...devices['Pixel 7'], baseURL: `http://${HOST}:${SETUP_PORT}` },
    },
  ],
  webServer: [
    // Placeholder credentials: real env vars beat .env, so the app passes its
    // "is Supabase configured" check without ever talking to the real project.
    // Tests either use demo mode (sessionStorage) or mock this host.
    previewServer(PORT, {
      VITE_SUPABASE_URL: 'https://e2e-placeholder.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'e2e-placeholder-anon-key',
    }),
    // The exact placeholder values src/lib/supabase.js treats as "not configured".
    previewServer(SETUP_PORT, {
      VITE_SUPABASE_URL: 'https://YOUR_PROJECT_ID.supabase.co',
      VITE_SUPABASE_ANON_KEY: 'YOUR_ANON_KEY',
    }),
  ],
})
