import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-lionbyte:static-site', function () {
  this.timeout(5000)

  describe('scaffolds a static-site', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/static-site'))
      .withPrompts({
        react: false
      })
    })

    it('creates files', () => {
      assert.file([
        '.babelrc',
        'pages/components/header.ejs',
        'pages/components/metas.ejs',
        'pages/components/stylesheets.ejs',
        'pages/views/index.ejs',
        'src/index.js',
        'styles/main.less',
        'test/ui/basic.js',
        'test/ui/index.js',
        'gulpfile.babel.js',
        'webpack.common.js',
        'webpack.dev.js',
        'webpack.prod.js'
      ])
    })
  })

  describe('scaffolds a static-site with React', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/static-site'))
      .withPrompts({
        react: true
      })
    })

    it('creates files', () => {
      assert.file([
        '.babelrc',
        'pages/components/header.ejs',
        'pages/components/metas.ejs',
        'pages/components/stylesheets.ejs',
        'pages/views/index.ejs',
        'src/index.js',
        'src/App.js',
        'styles/main.less',
        'test/ui/basic.js',
        'test/ui/index.js',
        'gulpfile.babel.js',
        'webpack.common.js',
        'webpack.dev.js',
        'webpack.prod.js'
      ])
    })
  })
})
