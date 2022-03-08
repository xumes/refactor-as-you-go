export default {
  roots: ['<rootDir>/src/services'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/services/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
