const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { resolve } = require('path')

const genPath = resolve(__dirname, './index')
const commonFiles = [
  'test/index.test.js',
  '.editorconfig',
  '.eslintrc.json',
  '.gitattributes',
  '.gitignore',
  '.prettierrc',
  '.travis.yml',
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',
  'LICENSE.md',
  'README.md'
]

describe('common (node)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      gitHooks: true,
      projectType: 'node',
      react: false
    })
  )

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('creates pre-commit linting file configuration', () => {
    assert.file(['.huskyrc', '.lintstagedrc'])
  })
})

describe('common (frontend)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      gitHooks: false,
      projectType: 'frontend',
      react: false
    })
  )

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('no pre-commit linting file configuration', () => {
    assert.noFile(['.huskyrc', '.lintstagedrc'])
  })
})

describe('common (frontend w/ React)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      gitHooks: false,
      projectType: 'frontend',
      react: true
    })
  )

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('no pre-commit linting file configuration', () => {
    assert.noFile(['.huskyrc', '.lintstagedrc'])
  })
})
