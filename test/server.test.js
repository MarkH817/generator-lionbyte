const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { files } = require('./utils/config')

describe('generator-lionbyte:server', () => {
  describe('scaffolds a server project', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing server',
          version: '0.0.0',
          projectType: 'server'
        })
    })

    test('creates files', () => {
      assert.file([...files.common, ...files.server])
    })
  })
})
