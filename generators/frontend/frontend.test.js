const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const StaticSite = require('./index')

const genPath = require.resolve('./index')

const frontendFiles = [
  'static/index.html',
  'src/index.js',
  '.babelrc',
  'webpack.common.js',
  'webpack.dev.js',
  'webpack.prod.js'
]

describe('Frontend', () => {
  beforeAll(() => {
    // Prompts cause the test suite to error out
    StaticSite.prototype.prompting = () => Promise.resolve()
  })

  test('React', () =>
    expect(
      helpers
        .run(StaticSite, { resolved: genPath })
        .withLocalConfig({ react: true })
        .then(() => {
          assert.file(frontendFiles)
          assert.fileContent('.babelrc', 'react')
        })
    ).resolves.toBeUndefined())

  test('Vanilla', () =>
    expect(
      helpers
        .run(StaticSite, { resolved: genPath })
        .withLocalConfig({ react: false })
        .then(() => {
          assert.file(frontendFiles)
          assert.noFileContent('.babelrc', 'react')
        })
    ).resolves.toBeUndefined())
})
