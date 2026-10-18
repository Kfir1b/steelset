import { test as base, expect } from '@playwright/test'
import MCR from 'monocart-coverage-reports'
import coverageOptions from './coverage.config.js'

export { expect }

export const SUPABASE_URL = 'https://e2e-placeholder.supabase.co'

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]'])

export const test = base.extend({
  // Every request the page made (or tried to make) to any *.supabase.co host.
  supabaseRequests: async ({}, use) => {
    await use([])
  },

  page: async ({ page, supabaseRequests }, use) => {
    const pageErrors = []
    const consoleErrors = []
    page.on('pageerror', err => pageErrors.push(err.message))
    page.on('console', msg => {
      // Aborted external requests (see below) log "Failed to load resource".
      if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
        consoleErrors.push(msg.text())
      }
    })
    page.on('request', req => {
      if (new URL(req.url()).hostname.endsWith('supabase.co')) supabaseRequests.push(req)
    })

    // Hermetic by default: nothing leaves localhost (fonts, Unsplash, YouTube,
    // Supabase). A test that needs Supabase registers its own mock route,
    // which takes precedence over this one.
    // Context-level so it also covers extra tabs a test opens.
    await page.context().route(url => !LOCAL_HOSTS.has(url.hostname), route => route.abort())

    if (process.env.COVERAGE) await page.coverage.startJSCoverage({ resetOnNavigation: false })

    await use(page)

    if (process.env.COVERAGE) await MCR(coverageOptions).add(await page.coverage.stopJSCoverage())

    expect(pageErrors, 'uncaught errors in the page').toEqual([])
    expect(consoleErrors, 'console errors in the page').toEqual([])
  },
})
