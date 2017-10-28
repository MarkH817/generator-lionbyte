import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-lionbyte:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing the generator-lionbyte'
      })
  })

  it('creates files', () => {
    assert.file([
      'src/index.js',
      'test/index.js',
      '.babelrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'LICENSE',
      'package.json',
      'README.md'
    ])
  })
})
