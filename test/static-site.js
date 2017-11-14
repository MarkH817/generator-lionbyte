import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {files, timeout} from './utils/config'

describe('generator-lionbyte:static-site', function () {
  this.timeout(timeout)

  const projectFiles = [
    'pages/components/header.ejs',
    'pages/components/metas.ejs',
    'pages/components/stylesheets.ejs',
    'pages/views/index.ejs',
    'styles/main.less',
    'tasks/js.js',
    'tasks/pages.js',
    'tasks/styles.js',
    'test/ui/basic.js',
    'test/ui/index.js',
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

    it('creates files', () => {
      assert.file([
        ...projectFiles,
        ...files
      ])
    })

    it('does not containt React in the configuration files', () => {
      assert.noFileContent('.babelrc', /react/)
      assert.noFileContent('webpack.common.js', /react/)
    })

    it('does not create App.js', () => {
      assert.noFile([
        'src/App.js'
      ])
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

    it('creates files', () => {
      assert.file([
        ...projectFiles,
        ...files
      ])
    })

    it('contains React in the configuration files', () => {
      assert.fileContent('.babelrc', /react/)
      assert.fileContent('webpack.common.js', /react/)
    })
  })
})
