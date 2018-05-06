const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { timeout } = require('./utils/config')

describe('generator-lionbyte:package', function () {
  this.timeout(timeout)

  describe('write package.json w/out git hook configurations', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../src/package'))
        .withLocalConfig({
          name: 'test',
          description: 'a test',
          version: '0.0.0',
          projectType: 'generic',
          command: false,
          gitHooks: false
        })
        .then(() => done())
    })

    it('does not have husky or lint-staged', done => {
      assert.noFileContent('package.json', /husky/)
      assert.noFileContent('package.json', /lint-staged/)
      done()
    })
  })

  describe('adds git hook configurations', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../src/package'))
        .withLocalConfig({
          name: 'test',
          description: 'a test',
          version: '0.0.0',
          projectType: 'generic',
          command: false,
          gitHooks: true
        })
        .then(() => done())
    })

    it('has husky and lint-staged configurations', done => {
      assert.fileContent('package.json', /husky/)
      assert.fileContent('package.json', /lint-staged/)
      done()
    })
  })
})
