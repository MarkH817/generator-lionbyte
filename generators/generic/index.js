const Generator = require('yeoman-generator')

const { copy } = require('../utils')

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

    return this.prompt(prompts).then(props => {
      this.config.set('cli', props.cli)

      /** @type {{ cli: boolean }} */
      this.props = { cli: props.cli }
    })
  }

  writing () {
    const staticFiles = getStaticFiles(this.props)
    staticFiles.map(file => copy(this, file))
  }

  install () {
    this.npmInstall(['nodemon@latest'], { saveDev: true })

    if (this.props.cli) {
      this.npmInstall(['chalk@latest', 'commander@latest'])
    }
  }
}

/**
 * @param {{cli: boolean}} props
 */
function getStaticFiles (props) {
  const { cli } = props
  return ['src/index.js'].concat(cli ? ['src/cli.js'] : [])
}
