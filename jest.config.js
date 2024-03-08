/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.tsx',
  ],
 "runner": "jest-electron/runner",
 "testEnvironment": "jest-electron/environment",
};