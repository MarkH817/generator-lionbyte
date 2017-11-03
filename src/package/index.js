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
      .then(props => {
        this.props = props
      })
  }

  _sortObj (obj) {
    let keys = Object.keys(obj).sort()

    let sorted = {}

    keys.map((key) => {
      sorted = Object.assign(sorted, {[key]: obj[key]})
    })

    return sorted
  }

  _projectAdjustments (info, type) {
    let result = Object.assign({}, info)

    let scripts = {}
    let globals = []
    let standard = {}

    switch (type) {
      case 'static-site':
        scripts = Object.assign(result.scripts, {
          'build:prod': 'gulp build:prod',
          'test:ui': 'babel-node test/ui'
        })

        globals = [
          ...result.standard.globals,
          'fixture',
          'test'
        ].sort()

        standard = Object.assign(result.standard, {globals})

        result = Object.assign(result, {
          scripts: this._sortObj(scripts),
          standard: this._sortObj(standard)
        })
        break
      default:
        if (this.props.command) {
          result = Object.assign(result, {
            bin: {
              [this.props.command]: 'dist/cli'
            }
          })
        }

        scripts = Object.assign(result.scripts, {
          'start': 'babel-node src/index'
        })

        result = Object.assign(result, {
          scripts: this._sortObj(scripts)
        })
        break
    }

    return result
  }

  _packageUpdate (info) {
    let result = Object.assign({}, info)

    if (this.fs.exists(this.destinationPath('package.json'))) {
      let prev = this.fs.readJSON(this.destinationPath('package.json'))
      result.bin = this._sortObj(Object.assign(prev.bin, info.bin))
      result = Object.assign(prev, result)
    }

    return result
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

    info = this._projectAdjustments(info, this.config.get('projectType'))

    /* Update package.json if exists */
    info = this._packageUpdate(info)

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      info
    )
  }
}
