const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const { files, timeout } = require('./utils/config')

describe('generator-lionbyte:static-site', function () {
  this.timeout(timeout)

  describe('scaffolds a static-site', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app')).withPrompts({
        name: 'test',
        description: 'testing static-site',
        version: '0.0.0',
        projectType: 'static-site',
        react: false
      })
    })

    it('creates files', done => {
      assert.file(files['static-site'])
      done()
    })

    it('does not containt React in the configuration files', done => {
      assert.noFileContent('.babelrc', /react/)
      done()
    })
  })

  describe('scaffolds a static-site with React', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app')).withPrompts({
        name: 'test',
        description: 'testing static-site',
        version: '0.0.0',
        projectType: 'static-site',
        react: true
      })
    })

    it('creates files', done => {
      assert.file(files['static-site'])
      done()
    })

    it('contains React in the configuration files', done => {
      assert.fileContent('.babelrc', /react/)
      done()
    })
  })
})
