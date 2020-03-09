const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const genPath = require.resolve('./index')
const tsFiles = ['tsconfig.json']

describe('TypeScript (node)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      projectType: 'node',
      react: false
    })
  )

  test('creates tsconfig.json', () => {
    assert.file(tsFiles)
  })

  test('uses "esnext" module type', () => {
    assert.fileContent('tsconfig.json', `"module": "CommonJS"`)
  })
})

describe('TypeScript (frontend)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      projectType: 'frontend',
      react: false
    })
  )

  test('creates tsconfig.json', () => {
    assert.file(tsFiles)
  })

  test('uses "esnext" module type', () => {
    assert.fileContent('tsconfig.json', `"module": "ESNext"`)
  })
})

describe('TypeScript (frontend w/ React)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      projectType: 'frontend',
      react: true
    })
  )

  test('creates tsconfig.json', () => {
    assert.file(tsFiles)
  })

  test('uses "esnext" module type', () => {
    assert.fileContent('tsconfig.json', `"module": "ESNext"`)
  })

  test('contains JSX configuration', () => {
    assert.fileContent('tsconfig.json', `"jsx": "react"`)
  })
})
