import Generator from 'yeoman-generator'
import {sortObj} from '../utils'

module.exports = class Package extends Generator {
  prompting () {
    let prompts = []

    if (this.config.get('cli')) {
      prompts = [
        ...prompts,
        {
          type: String,
          name: 'command',
          message: 'What is the command name for your cli?',
          default: this.config.get('name')
        }
      ]
    }

    return this.prompt(prompts)
      .then(props => (this.props = props))
  }

  writing () {
    /* Set basic info */
    let info = this.getBaseInfo()

    let tpl = this.fs.readJSON(this.templatePath('package.json'))
    info = Object.assign(info, tpl)
    info = projectAdjustments(info, this.props, this.config.get('projectType'))

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
function projectAdjustments (info, props, type) {
  switch (type) {
    case 'static-site':
      return typeStaticSite(info, props)
    case 'server':
      return typeServer(info, props)
    default:
      return typeGeneric(info, props)
  }
}

function typeStaticSite (info, props) {
  let scripts = Object.assign(info.scripts, {
    'build:prod': 'gulp build:prod'
  })

  return Object.assign(info, {
    scripts: sortObj(scripts)
  })
}

function typeGeneric (info, {command}) {
  /* Define cli command only if it's provided */
  let bin = command ? {
    [command]: 'dist/cli'
  } : {}

  let scripts = Object.assign(info.scripts, {
    'start': 'babel-node src/index'
  })

  return Object.assign(info, {
    bin,
    scripts: sortObj(scripts)
  })
}

function typeServer (info, props) {
  let scripts = Object.assign(info.scripts, {
    'serve': 'node dist/index',
    'start': 'nodemon src/index --exec babel-node'
  })

  return Object.assign(info, {
    scripts: sortObj(scripts)
  })
}
