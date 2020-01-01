const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { resolve } = require('path')

const genPath = resolve(__dirname, './index')
const tsFiles = ['declarations.d.ts', 'tsconfig.json']

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
    assert.fileContent('tsconfig.json', `"module": "commonjs"`)
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
    assert.fileContent('tsconfig.json', `"module": "esnext"`)
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
    assert.fileContent('tsconfig.json', `"module": "esnext"`)
  })

  test('contains JSX configuration', () => {
    assert.fileContent('tsconfig.json', `"jsx": "react"`)
  })
})
