import MCR from 'monocart-coverage-reports'
import coverageOptions from './coverage.config.js'

export default async function globalTeardown() {
  if (process.env.COVERAGE) await MCR(coverageOptions).generate()
}
