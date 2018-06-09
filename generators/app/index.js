// @ts-ignore
const { red } = require('chalk')
const Generator = require('yeoman-generator')
const yosay = require('yosay')

const { projectTypes } = require('../utils')

module.exports = class LionByte extends Generator {
  prompting () {
    this.log(
      yosay(`Welcome to the best ${red('generator-lionbyte')} generator!`)
    )

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: ''
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: '0.0.0'
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of NodeJS project are you doing?',
        choices: projectTypes,
        default: 'generic'
      },
      {
        type: 'confirm',
        name: 'gitHooks',
        message: 'Do you want to add linting to your precommit hooks?',
        default: false
      }
    ]

    return this.prompt(prompts).then(props => {
      this.config.set('name', props.name)
      this.config.set('description', props.description)
      this.config.set('version', props.version)
      this.config.set('projectType', props.projectType)
      this.config.set('gitHooks', props.gitHooks)

      const subgenerators = [
        `../common`,
        `../${props.projectType}`,
        `../package`,
        `../typescript`
      ].map(path => require.resolve(path))

      subgenerators.map(sub => this.composeWith(sub, undefined))
    })
  }
}
