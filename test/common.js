const path = require('path')
// const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { timeout } = require('./utils/config')

describe('generator-lionbyte:common', function () {
  this.timeout(timeout)

  describe('installs pre-commit packages', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../src/common'))
        .withLocalConfig({
          gitHooks: true
        })
        .then(() => done())
    })

    it('installs husky and lint-staged', done => {
      // actually assert the test ya dummy
      done()
    })
  })
})
