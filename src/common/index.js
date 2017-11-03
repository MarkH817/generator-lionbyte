import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  writing () {
    const filenames = [
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'CHANGELOG.md',
      'docs/ISSUE_TEMPLATE.md',
      'docs/PULL_REQUEST_TEMPLATE.md',
      'CONTRIBUTING.md'
    ]

    const filesWithParams = [
      'LICENSE.md',
      'README.md',
      'CODE_OF_CONDUCT.md'
    ]

    /* Writing */
    filenames.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })

    filesWithParams.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          name: this.config.get('name'),
          description: this.config.get('description'),
          user: {
            name: this.user.git.name(),
            email: this.user.git.email()
          }
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
