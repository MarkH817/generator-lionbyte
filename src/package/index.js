import Generator from 'yeoman-generator'

module.exports = class extends Generator {
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

    let updatedScripts = {}

    switch (this.config.get('projectType')) {
      case 'static-site':
        updatedScripts = Object.assign(info.scripts, {
          'build:prod': 'gulp build:prod',
          'test:ui': 'babel-node test/ui'
        })

        let updatedGlobals = [
          ...info.standard.globals,
          'fixture',
          'test'
        ].sort()

        let updatedStandard = Object.assign(info.standard, {
          globals: updatedGlobals
        })

        info = Object.assign(info, {
          scripts: this._sortObj(updatedScripts),
          standard: this._sortObj(updatedStandard)
        })
        break
      default:
        if (this.props.command) {
          info = Object.assign(info, {
            bin: {
              [this.props.command]: 'dist/cli'
            }
          })
        }

        updatedScripts = Object.assign(info.scripts, {
          'start': 'babel-node src/index'
        })

        info = Object.assign(info, {
          scripts: this._sortObj(updatedScripts)
        })
        break
    }

    /* Update package.json if exists */
    if (this.fs.exists(this.destinationPath('package.json'))) {
      let prev = this.fs.readJSON(this.destinationPath('package.json'))
      info.bin = this._sortObj(Object.assign(prev.bin, info.bin))
      info = Object.assign(prev, info)
    }

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      info
    )
  }
}
