const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const {files, timeout} = require('./utils/config')

describe('generator-lionbyte:static-site', function () {
  this.timeout(timeout)

  const projectFiles = [
    ...files,
    'pages/components/header.ejs',
    'pages/components/metas.ejs',
    'pages/components/stylesheets.ejs',
    'pages/views/index.ejs',
    'styles/main.less',
    'tasks/js.js',
    'tasks/pages.js',
    'tasks/styles.js',
    'webpack.common.js',
    'webpack.dev.js',
    'webpack.prod.js'
  ]

  describe('scaffolds a static-site', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
        .withPrompts({
          name: 'test',
          description: 'testing static-site',
          version: '0.0.0',
          projectType: 'static-site',
          react: false
        })
    })

    it('creates files', (done) => {
      assert.file(projectFiles)
      done()
    })

    it('does not containt React in the configuration files', (done) => {
      assert.noFileContent('.babelrc', /react/)
      assert.noFileContent('webpack.common.js', /react/)
      done()
    })

    it('does not create App.js', (done) => {
      assert.noFile(['src/App.js'])
      done()
    })
  })

  describe('scaffolds a static-site with React', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
        .withPrompts({
          name: 'test',
          description: 'testing static-site',
          version: '0.0.0',
          projectType: 'static-site',
          react: true
        })
    })

    it('creates files', (done) => {
      assert.file([...projectFiles, 'src/App.js'])
      done()
    })

    it('contains React in the configuration files', (done) => {
      assert.fileContent('.babelrc', /react/)
      assert.fileContent('webpack.common.js', /react/)
      done()
    })
  })
})
