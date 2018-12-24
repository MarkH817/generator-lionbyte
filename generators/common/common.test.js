const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { resolve } = require('path')

const genPath = resolve(__dirname, './index')
const commonFiles = [
  '.github/ISSUE_TEMPLATE.md',
  '.github/PULL_REQUEST_TEMPLATE.md',
  'test/index.test.js',
  '.editorconfig',
  '.eslintrc.json',
  '.gitattributes',
  '.gitignore',
  '.prettierrc',
  '.travis.yml',
  'CHANGELOG.md',
  'CODE_OF_CONDUCT.md',
  'CONTRIBUTING.md',
  'LICENSE.md',
  'README.md'
]

describe('common (node)', () => {
  beforeAll(() => {
    return helpers.run(genPath).withLocalConfig({
      gitHooks: true,
      projectType: 'node',
      react: false
    })
  })

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('creates pre-commit linting file configuration', () => {
    assert.file(['.huskyrc', '.lintstagedrc'])
  })

  test('has frontend config in .eslintrc.json', () => {
    assert.noJsonFileContent('.eslintrc.json', { parser: 'babel-eslint' })
  })
})

describe('common (frontend)', () => {
  beforeAll(() => {
    return helpers.run(genPath).withLocalConfig({
      gitHooks: false,
      projectType: 'frontend',
      react: false
    })
  })

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('no pre-commit linting file configuration', () => {
    assert.noFile(['.huskyrc', '.lintstagedrc'])
  })

  test('has frontend config in .eslintrc.json', () => {
    assert.jsonFileContent('.eslintrc.json', { parser: 'babel-eslint' })
    assert.noFileContent(
      '.eslintrc.json',
      /standard-jsx|react\/jsx-uses-react|react\/jsx-uses-vars/g
    )
  })
})

describe('common (frontend w/ React)', () => {
  beforeAll(() => {
    return helpers.run(genPath).withLocalConfig({
      gitHooks: false,
      projectType: 'frontend',
      react: true
    })
  })

  test('creates files', () => {
    assert.file(commonFiles)
  })

  test('no pre-commit linting file configuration', () => {
    assert.noFile(['.huskyrc', '.lintstagedrc'])
  })

  test('has frontend + React config in .eslintrc.json', () => {
    assert.jsonFileContent('.eslintrc.json', { parser: 'babel-eslint' })
    assert.fileContent(
      '.eslintrc.json',
      /standard-jsx|react\/jsx-uses-react|react\/jsx-uses-vars/g
    )
  })
})
