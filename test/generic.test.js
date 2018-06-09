const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { files } = require('./utils/config')

describe('generator-lionbyte:generic', () => {
  describe('scaffolds a generic project with cli', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing generic',
          version: '0.0.0',
          projectType: 'generic',
          command: 'heck'
        })
    })

    test('creates files', () => {
      assert.file([...files.common, ...files.generic, 'src/cli.js'])
    })
  })

  describe('scaffolds a generic project', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing the generator-lionbyte',
          version: '0.0.0',
          projectType: 'generic',
          command: ''
        })
    })

    test('creates files', () => {
      assert.file([...files.common, ...files.generic])
    })

    test('does not create cli.js', () => {
      assert.noFile(['src/cli.js'])
    })
  })
})
