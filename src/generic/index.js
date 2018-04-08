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
      this.props = props
    })
  }

  writing () {
    return new Promise(resolve => {
      const staticFiles = getStaticFiles(this.props)
      staticFiles.map(file => copy(this, file))

      resolve()
    })
  }

  install () {
    this.npmInstall(['nodemon@latest'], { saveDev: true })

    if (this.props.cli) {
      this.npmInstall(['chalk@latest', 'commander@latest'])
    }
  }
}

function getStaticFiles (props) {
  let files = ['src/index.js']

  if (props.cli) {
    return [...files, 'src/cli.js']
  } else {
    return files
  }
}
