const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-lionbyte:package', () => {
  describe('write package.json w/out git hook configurations', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/package'))
        .withLocalConfig({
          name: 'test',
          description: 'a test',
          version: '0.0.0',
          projectType: 'generic',
          command: false,
          gitHooks: false
        })
    })

    test('does not have husky or lint-staged', () => {
      assert.noFileContent('package.json', /husky/g)
      assert.noFileContent('package.json', /lint-staged/g)
    })
  })

  describe('adds git hook configurations', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/package'))
        .withLocalConfig({
          name: 'test',
          description: 'a test',
          version: '0.0.0',
          projectType: 'generic',
          command: false,
          gitHooks: true
        })
    })

    test('has husky and lint-staged configurations', () => {
      assert.fileContent('package.json', /husky/g)
      assert.fileContent('package.json', /lint-staged/g)
    })
  })
})
