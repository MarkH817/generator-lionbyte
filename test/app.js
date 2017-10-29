import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-lionbyte:app', function () {
  this.timeout(5000)

  describe('scaffolds a generic project', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing the generator-lionbyte',
        projectType: 'generic'
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
        'CHANGELOG.md',
        'gulpfile.babel.js',
        'LICENSE.md',
        'package.json',
        'README.md'
      ])
    })
  })

  describe('scaffolds a static-site project', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing the generator-lionbyte',
        projectType: 'static-site'
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
        'CHANGELOG.md',
        'gulpfile.babel.js',
        'LICENSE.md',
        'package.json',
        'README.md'
      ])
    })
  })
})