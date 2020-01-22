const { resolve } = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

const genPath = resolve(__dirname, './index')
const nodeFiles = ['src/index.js']

describe('node', () => {
  beforeAll(() => helpers.run(genPath))

  test('creates files', () => {
    assert.file(nodeFiles)
  })
})
