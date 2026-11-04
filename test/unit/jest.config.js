// Jest config for the unit suite (*.test.js).
module.exports = {
  rootDir: './',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // The connect bundle emits thousands of INFO logs during the suite. Jest
  // captures a stack trace for every console call and renders it, which on
  // slower CI hosts dominated runtime (~180s -> ~13s when suppressed).
  // Override on the CLI with `--silent=false` when debugging a specific test.
  silent: true,
  // The coverage-instrumented bundle runs far slower under parallel load on
  // the build hosts (AL2_x86_64) than locally, so timer-driven softphone
  // telemetry tests can brush past Jest's 5000ms default. Widen the per-test
  // wall-clock ceiling; assertions are unchanged, this only adds headroom.
  testTimeout: 30000,
  clearMocks: true,
  restoreMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/../../src/**/*.js',
    '!<rootDir>/../../src/**/*.d.ts',
    // Vendored / bundled third-party code — not our source. This mirrors the
    // istanbul exclude in webpack/connect-streams-test.config.js and avoids
    // instrumenting the ~807KB aws-client bundle.
    '!<rootDir>/../../src/aws-client.js',
    '!<rootDir>/../../src/lib/**',
  ],
  coverageDirectory: '<rootDir>/../../build/brazil-documentation/coverage',
  coverageReporters: ['text', 'html', 'lcov', 'cobertura'],
  reporters: ['default'],
  // TODO: set real thresholds once the suite is fully migrated.
  coverageThreshold: {
    global: { statements: 85, branches: 75, functions: 75, lines: 85 },
  },
};
