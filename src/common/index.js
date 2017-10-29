import Generator from 'yeoman-generator'
import chalk from 'chalk'
// import yosay from 'yosay'

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

  prompting () {
    this.log(`Common ${chalk.cyan('prompting')}`)
  }

  writing () {
    this.log(`Common ${chalk.cyan('writing')}`)

    const filenames = [
      'src/index.js',
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
      'babel-core',
      'babel-preset-env',
      'babel-register',
      'coveralls',
      'chai',
      'del',
      'gulp',
      'gulp-plumber',
      'mocha',
      'nyc',
      'standard'
    ], {
      saveDev: true
    })
  }
}
