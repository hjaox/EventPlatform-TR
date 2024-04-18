/** @type {import('ts-jest').JestConfigWithTsJest} */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  workerIdleMemoryLimit: '512MB',
  coverageProvider: 'v8',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
};

/* eslint no-unused-vars: ["error", { "args": "none" }] */