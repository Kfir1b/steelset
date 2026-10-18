import MCR from 'monocart-coverage-reports'
import coverageOptions from './coverage.config.js'

export default async function globalSetup() {
  if (process.env.COVERAGE) MCR(coverageOptions).cleanCache()
}
