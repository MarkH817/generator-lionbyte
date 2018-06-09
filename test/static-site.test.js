const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const { files } = require('./utils/config')

describe('generator-lionbyte:static-site', () => {
  describe('scaffolds a static-site', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing static-site',
          version: '0.0.0',
          projectType: 'static-site',
          react: false
        })
    })

    test('creates files', () => {
      assert.file([...files.common, ...files['static-site']])
    })

    test('does not containt React in the configuration files', () => {
      assert.noFileContent('.babelrc', /react/g)
    })
  })

  describe('scaffolds a static-site with React', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({
          name: 'test',
          description: 'testing static-site',
          version: '0.0.0',
          projectType: 'static-site',
          react: true
        })
    })

    test('creates files', () => {
      assert.file([...files.common, ...files['static-site']])
    })

    test('contains React in the configuration files', () => {
      assert.fileContent('.babelrc', /react/g)
    })
  })
})
