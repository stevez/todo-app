import type { Config } from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {
      presets: ['next/babel']  // Use the same Babel config as Playwright
    }]
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/src/app/components/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/api/(.*)$': '<rootDir>/src/api/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/e2e/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/app/favicon.ico', '!src/app/globals.css', '!src/types/**/*.ts'],
  coverageDirectory: './coverage/unit',
  coverageReporters: ['text', 'lcov', 'json'],
};

export default config;
