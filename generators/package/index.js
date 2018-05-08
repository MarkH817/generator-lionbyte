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
    /* Set basic info */
    const tpl = this.fs.readJSON(this.templatePath('package.json'))
    let info = this.getBaseInfo()

    info = Object.assign({}, info, tpl)
    info = projectAdjustments(
      info,
      this.props,
      this.config.get('projectType'),
      this.config.get('gitHooks')
    )

    this.fs.writeJSON(this.destinationPath('package.json'), info)
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
function projectAdjustments (info, props, type, gitHooks) {
  let { scripts, standard } = info
  let bin = {}
  let hookInfo = {}

  if (gitHooks) {
    hookInfo = {
      husky: {
        hooks: {
          'pre-commit': ['lint-staged']
        }
      },
      'lint-staged': {
        '*.js': ['prettier --write', 'standard --fix', 'git add'],
        '*.{md,less}': ['prettier --write', 'git add']
      }
    }
  }

  switch (type) {
    case 'static-site':
      scripts = Object.assign({}, scripts, {
        dev: 'webpack-dev-server --config webpack.dev.js --open',
        build: 'webpack --config webpack.prod.js',
        test:
          'standard src && cross-env NODE_ENV=test nyc mocha --require babel-register'
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

    case 'generic':
    default:
      if (props.command) {
        bin[props.command] = 'src/cli'
      }

      scripts = Object.assign({}, scripts, {
        dev: 'nodemon src',
        start: 'node src'
      })
  }

  return Object.assign({}, info, hookInfo, {
    scripts: sortObj(scripts),
    bin,
    standard
  })
}
