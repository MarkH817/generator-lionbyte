import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-lionbyte:common', function () {
  this.timeout(5000)

  before(() => {
    return helpers.run(path.join(__dirname, '../src/common'))
      .withArguments([
        'good-name',
        'this app evaluates names'
      ])
  })

  it('creates files', () => {
    assert.file([
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'CHANGELOG.md',
      'LICENSE.md',
      'README.md'
    ])
  })
})
