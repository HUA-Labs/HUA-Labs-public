module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/__tests__/**/*',
    '!src/index.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 75,
      statements: 75
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: false
};
