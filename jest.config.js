const config = {
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["@swc/jest"],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    // Mock CSS modules
    "\\.css$": "<rootDir>/__mocks__/fileMock.js",
  },
  testPathPattern: ["src/**/__tests__/**/*.[jt]s?(x)", "src/**/*.test.[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{ts,tsx}",
    "!src/app/**/*.tsx", // Skip page components
  ],
  coverageThresholds: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

module.exports = config;
