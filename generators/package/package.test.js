const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { resolve } = require('path')

const genPath = resolve(__dirname, './index')
const packageFiles = ['package.json']

describe('package (node)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      name: 'test',
      description: 'testing',
      projectType: 'node'
    })
  )

  test('creates package.json', () => {
    assert.file(packageFiles)
  })

  test('node scripts', () => {
    assert.fileContent('package.json', `"start": "node src"`)
  })
})

describe('package (frontend)', () => {
  beforeAll(() =>
    helpers.run(genPath).withLocalConfig({
      name: 'test',
      description: 'testing',
      projectType: 'frontend'
    })
  )

  test('creates package.json', () => {
    assert.file(packageFiles)
  })

  test('frontend scripts', () => {
    assert.fileContent(
      'package.json',
      `"build": "webpack --config webpack.prod.js"`
    )
    assert.fileContent(
      'package.json',
      `"dev": "webpack-dev-server --config webpack.dev.js --open"`
    )
  })
})
