const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { files, timeout } = require('./utils/config')

describe('generator-lionbyte:server', function () {
  this.timeout(timeout)

  describe('scaffolds a server project', () => {
    before(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing server',
          version: '0.0.0',
          projectType: 'server'
        })
    })

    it('creates files', done => {
      assert.file(files.server)
      done()
    })
  })
})
