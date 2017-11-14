import Generator from 'yeoman-generator'
import {copy, copyTpl} from '../utils'

module.exports = class Common extends Generator {
  _files () {
    const staticFiles = [
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      'CHANGELOG.md',
      'docs/ISSUE_TEMPLATE.md',
      'docs/PULL_REQUEST_TEMPLATE.md',
      'CONTRIBUTING.md'
    ]

    const tplFiles = [
      '.travis.yml',
      'LICENSE.md',
      'README.md',
      'CODE_OF_CONDUCT.md',
      '.npmignore'
    ]

    return {staticFiles, tplFiles}
  }

  _data () {
    return {
      name: this.config.get('name'),
      description: this.config.get('description'),
      user: {
        name: this.user.git.name(),
        email: this.user.git.email()
      },
      projectType: this.config.get('projectType')
    }
  }

  writing () {
    const {staticFiles, tplFiles} = this._files()
    const data = this._data()

    /* Writing */
    staticFiles.map(file => copy(this, file))
    tplFiles.map(file => copyTpl(this, data, file))

    /* Must be manually renamed */
    /* NPM keeps deleting this file */
    copy(this, '_gitignore', '.gitignore')
  }

  install () {
    /* Install devDependencies */
    this.npmInstall([
      'babel-cli',
      'babel-core',
      'babel-preset-env',
      'babel-register',
      'coveralls',
      'chai',
      'del',
      'gulp',
      'gulp-babel',
      'gulp-plumber',
      'gulp-sequence',
      'gulp-sourcemaps',
      'mocha',
      'nyc',
      'standard'
    ], {
      saveDev: true
    })
  }
}
