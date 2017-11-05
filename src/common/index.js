import Generator from 'yeoman-generator'

module.exports = class Common extends Generator {
  _files () {
    const staticFiles = [
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
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

  writing () {
    const list = this._files()

    /* Writing */
    list.staticFiles.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })

    list.tplFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          name: this.config.get('name'),
          description: this.config.get('description'),
          user: {
            name: this.user.git.name(),
            email: this.user.git.email()
          },
          projectType: this.config.get('projectType')
        }
      )
    })
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
