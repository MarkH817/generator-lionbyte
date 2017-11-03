import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'confirm',
        name: 'cli',
        message: 'Are you making a cli?',
        default: false
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        this.config.set('cli', props.cli)
        this.props = props
      })
  }

  writing () {
    const filenames = [
      'src/index.js',
      '.babelrc',
      'gulpfile.babel.js',
      '.npmignore'
    ]

    /* Writing */
    filenames.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })

    if (this.props.cli) {
      this.fs.copy(
        this.templatePath('src/cli.js'),
        this.destinationPath('src/cli.js')
      )
    }
  }

  install () {
    if (this.props.cli) {
      this.npmInstall([
        'chalk',
        'commander'
      ])
    }
  }
}
