import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {files} from './utils/common'

describe('generator-lionbyte:static-site', function () {
  this.timeout(5000)

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
        'pages/components/header.ejs',
        'pages/components/metas.ejs',
        'pages/components/stylesheets.ejs',
        'pages/views/index.ejs',
        'styles/main.less',
        'test/ui/basic.js',
        'test/ui/index.js',
        'webpack.common.js',
        'webpack.dev.js',
        'webpack.prod.js',
        ...files
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
        'pages/components/header.ejs',
        'pages/components/metas.ejs',
        'pages/components/stylesheets.ejs',
        'pages/views/index.ejs',
        'src/App.js',
        'styles/main.less',
        'test/ui/basic.js',
        'test/ui/index.js',
        'webpack.common.js',
        'webpack.dev.js',
        'webpack.prod.js',
        ...files
      ])
    })
  })
})
