import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  constructor (args, opts) {
    super(args, opts)

    this.argument('name', {
      type: String,
      required: true
    })

    this.argument('description', {
      type: String,
      required: true
    })
  }

  writing () {
    const filenames = [
      'test/index.js',
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      'CHANGELOG.md'
    ]

    const filesWithParams = [
      'LICENSE.md',
      'README.md'
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
          name: this.options.name,
          description: this.options.description,
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
