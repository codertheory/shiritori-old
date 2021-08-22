// jest.config.ts
import type { Config } from "@jest/types"

// Sync object
const config: Config.InitialOptions = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  collectCoverageFrom: ["app/**/*.{ts,tsx}"],
  // The directory where Jest should output its coverage files
  coverageDirectory: "jest-coverage",
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
  preset: "blitz",
  reporters: ["default", "jest-junit"],
  testResultsProcessor: "jest-junit",
  watchPlugins: ["jest-watch-typeahead/filename", "jest-watch-typeahead/testname"],
}

export default config
