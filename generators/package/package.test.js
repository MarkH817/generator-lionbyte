const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const genPath = require.resolve('./index')
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
      // eslint-disable-next-line max-len
      `"build": "webpack --node-env=production --config webpack/webpack.prod.js"`
    )
    assert.fileContent(
      'package.json',
      `"dev": "webpack serve --config webpack/webpack.dev.js"`
    )
  })
})
