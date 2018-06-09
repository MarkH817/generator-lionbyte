const path = require('path')
// const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-lionbyte:common', () => {
  describe('installs pre-commit packages', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/common'))
        .withLocalConfig({
          gitHooks: true
        })
    })

    test('installs husky and lint-staged', () => {
      // actually assert the test ya dummy
      // assert.fileContent('.yo-rc.json', /lion/g)
    })
  })
})
