// Same suite, plus V8 code coverage of src/ (report: coverage/e2e/index.html).
// Set here rather than in the npm script so it works in every shell; the
// test workers inherit this environment.
process.env.COVERAGE = '1'

export { default } from './playwright.config.js'
