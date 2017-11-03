import Generator from 'yeoman-generator'

module.exports = class Generic extends Generator {
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

  _files () {
    let staticFiles = [
      'src/index.js',
      '.babelrc',
      'gulpfile.babel.js',
      '.npmignore'
    ]

    if (this.props.cli) {
      staticFiles = [...staticFiles, 'src/cli.js']
    }

    return {staticFiles}
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
