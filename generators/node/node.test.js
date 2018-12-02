const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const { resolve } = require('path')

const genPath = resolve(__dirname, './index')
const nodeFiles = ['src/index.js']

describe('node', () => {
  beforeAll(() => {
    return helpers.run(genPath)
  })

  test('creates files', () => {
    assert.file(nodeFiles)
  })
})
