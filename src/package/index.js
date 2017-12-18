import Generator from 'yeoman-generator'

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
    let info = {
      name: this.config.get('name'),
      description: this.config.get('description'),
      version: this.config.get('version'),
      author: {
        name: this.user.git.name(),
        email: this.user.git.email()
      }
    }

    let tpl = this.fs.readJSON(this.templatePath('package.json'))
    info = Object.assign(info, tpl)
    info = projectAdjustments(info, this.props, this.config.get('projectType'))

    this.fs.writeJSON(this.destinationPath('package.json'), info)
  }
}

/* Helper functions */
function sortObj (obj) {
  let keys = Object.keys(obj).sort()
  let sorted = {}

  keys.map((key) => {
    sorted = Object.assign(sorted, {[key]: obj[key]})
  })

  return sorted
}

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
  let result = Object.assign({}, info)

  let scripts = Object.assign(result.scripts, {
    'build:prod': 'gulp build:prod',
    'test:ui': 'babel-node test/ui'
  })

  let globals = [
    ...result.standard.globals,
    'fixture',
    'test'
  ].sort()

  let standard = Object.assign(result.standard, {globals})

  result = Object.assign(result, {
    scripts: sortObj(scripts),
    standard: sortObj(standard)
  })

  return result
}

function typeGeneric (info, props) {
  let result = Object.assign({}, info)

  if (props.command) {
    result = Object.assign(result, {
      bin: {
        [props.command]: 'dist/cli'
      }
    })
  }

  let scripts = Object.assign(result.scripts, {
    'start': 'babel-node src/index'
  })

  result = Object.assign(result, {
    scripts: sortObj(scripts)
  })

  return result
}

function typeServer (info, props) {
  let result = Object.assign({}, info)

  let scripts = Object.assign(result.scripts, {
    'serve': 'node dist/index',
    'start': 'nodemon src/index --exec babel-node'
  })

  result = Object.assign(result, {
    scripts: sortObj(scripts)
  })

  return result
}
