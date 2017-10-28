import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'

module.exports = class LionByte extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the best ' + chalk.red('generator-lionbyte') + ' generator!'
    ))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'Things...'
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        // To access props later use this.props.someAnswer;
        this.props = props
      })
  }

  writing () {
    /* Files */
    const filenames = [
      'src/index.js',
      'test/index.js',
      '.babelrc',
      '.editorconfig',
      '.gitattributes',
      '.gitignore'
    ]

    const filesWithParams = [
      'LICENSE',
      'package.json',
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
          name: this.props.name,
          description: this.props.description,
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
      'gulp-babel',
      'gulp-plumber',
      'mocha',
      'nyc',
      'standard'
    ], {
      saveDev: true
    })

    /* Install dependencies */
    this.npmInstall([
    ])
  }
}
