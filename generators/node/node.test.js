const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const genPath = require.resolve('./index')
const nodeFiles = ['src/index.js']

describe('node', () => {
  beforeAll(() => helpers.run(genPath))

  test('creates files', () => {
    assert.file(nodeFiles)
  })
})
