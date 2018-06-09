const Generator = require('yeoman-generator')

const { copy } = require('../utils')

module.exports = class Generic extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'input',
        name: 'command',
        message:
          'What is the command name for your cli? [Leave blank for no cli]',
        default: ''
      }
    ]

    return this.prompt(prompts).then(props => {
      this.config.set('command', props.command)
    })
  }

  writing () {
    const staticFiles = ['src/index.js'].concat(
      this.config.get('command').length !== 0 ? ['src/cli.js'] : []
    )

    staticFiles.map(file => copy(this, file))
  }

  install () {
    this.npmInstall(['@types/node@latest'], { saveDev: true })

    if (this.config.get('command').length !== 0) {
      this.npmInstall(['chalk@latest', 'commander@latest'])
    }
  }
}
