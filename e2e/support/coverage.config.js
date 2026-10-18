// Options for monocart-coverage-reports. Coverage is only collected when
// COVERAGE=1 (see `npm run test:e2e:coverage`). Chromium's V8 coverage of the
// production bundle is mapped back to the original src/ files through the
// build's source maps (playwright.config.js builds with --sourcemap).
export default {
  name: 'SteelSet e2e coverage',
  outputDir: './coverage/e2e',
  reports: ['v8', 'console-details', 'json-summary'],
  // The app bundle(s) only.
  entryFilter: entry => /\/assets\/[^/]+\.js(\?|$)/.test(entry.url),
  // Bundle sources look like "../../../../src/App.jsx" (relative to the build
  // dir); keep the repo-relative part. Dependencies (node_modules) are dropped.
  sourcePath: filePath => filePath.replace(/^.*?(?=src\/)/, ''),
  sourceFilter: sourcePath => sourcePath.startsWith('src/'),
}
