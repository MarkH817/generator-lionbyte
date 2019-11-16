const { red } = require('chalk')
const Generator = require('yeoman-generator')
const yosay = require('yosay')

const { getPackages } = require('../packages')
const { projectTypes } = require('../utils')

module.exports = class LionByte extends Generator {
  prompting () {
    this.log(
      yosay(`Welcome to the best ${red('generator-lionbyte')} generator!`)
    )

    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname.replace(/ /g, '-').toLowerCase()
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: ''
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of project are you doing?',
        choices: projectTypes,
        default: 'node'
      },
      {
        type: 'confirm',
        name: 'gitHooks',
        message: 'Do you want to add linting to your pre-commit hooks?',
        default: false
      }
    ]).then(props => {
      this.config.set('name', props.name.replace(/ /g, '-').toLowerCase())
      this.config.set('description', props.description)
      this.config.set('projectType', props.projectType)
      this.config.set('gitHooks', props.gitHooks)

      const subgenerators = [
        '../common',
        `../${props.projectType}`,
        '../package',
        '../typescript'
      ]

      subgenerators.forEach(sub => {
        this.composeWith(require.resolve(sub), {})
      })
    })
  }

  install () {
    const { devDependencies, dependencies } = getPackages(this.config.getAll())

    this.npmInstall(devDependencies, { saveDev: true })

    if (dependencies.length > 0) {
      this.npmInstall(dependencies)
    }
  }
}
