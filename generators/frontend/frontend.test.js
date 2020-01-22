const { resolve } = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const genPath = resolve(__dirname, './index')
const frontendFiles = [
  'static/index.html',
  'src/index.js',
  '.babelrc',
  'webpack.common.js',
  'webpack.dev.js',
  'webpack.prod.js'
]

describe('frontend (React)', () => {
  beforeAll(() => helpers.run(genPath).withPrompts({ react: true }))

  test('creates files', () => {
    assert.file(frontendFiles)
  })

  test('React in .babelrc', () => {
    assert.fileContent('.babelrc', 'react')
  })
})

describe('frontend', () => {
  beforeAll(() => helpers.run(genPath).withPrompts({ react: false }))

  test('creates files', () => {
    assert.file(frontendFiles)
  })

  test('no React in .babelrc', () => {
    assert.noFileContent('.babelrc', 'react')
  })
})
