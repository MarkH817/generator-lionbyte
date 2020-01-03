module.exports = {
  testEnvironment: 'node',
  projects: [
    { displayName: 'test' },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/generators/**/*.js']
    }
  ]
}
