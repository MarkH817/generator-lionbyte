const Generator = require('yeoman-generator')
const { sortObj } = require('../utils')

module.exports = class Package extends Generator {
  prompting () {
    let prompts = []

    if (this.config.get('cli')) {
      prompts = [
        {
          type: String,
          name: 'command',
          message: 'What is the command name for your cli?',
          default: this.config.get('name')
        }
      ]
    }

    return this.prompt(prompts).then(props => (this.props = props))
  }

  writing () {
    return new Promise(resolve => {
      /* Set basic info */
      const tpl = this.fs.readJSON(this.templatePath('package.json'))
      let info = this.getBaseInfo()

      info = Object.assign({}, info, tpl)
      info = projectAdjustments(
        info,
        this.props,
        this.config.get('projectType')
      )

      this.fs.writeJSON(this.destinationPath('package.json'), info)
      resolve()
    })
  }

  getBaseInfo () {
    return {
      name: this.config.get('name'),
      description: this.config.get('description'),
      version: this.config.get('version'),
      author: {
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    }
  }
}

/* Helper functions */
function projectAdjustments (info, props, type) {
  let { scripts, standard } = info
  let bin = {}

  switch (type) {
    case 'static-site':
      scripts = Object.assign({}, scripts, {
        dev: 'webpack --config webpack.dev.js --watch --progress',
        build: 'webpack --config webpack.prod.js --progress',
        clean: 'del dist',
        lint: 'standard --parser babel-eslint',
        'lint:fix': 'standard --parser babel-eslint --fix'
      })
      standard = Object.assign({}, standard, {
        parser: 'babel-eslint'
      })
      break
    case 'server':
      scripts = Object.assign({}, scripts, {
        dev: 'nodemon src',
        start: 'node src'
      })
      break
    default:
      if (props.command) {
        bin[props.command] = 'src/cli'
      }

      scripts = Object.assign({}, scripts, {
        dev: 'nodemon src',
        start: 'node src'
      })
  }

  return Object.assign({}, info, {
    scripts: sortObj(scripts),
    bin,
    standard
  })
}
