// @ts-ignore
const { red } = require('chalk')
const Generator = require('yeoman-generator')
const yosay = require('yosay')

module.exports = class LionByte extends Generator {
  prompting () {
    this.log(
      yosay(`Welcome to the best ${red('generator-lionbyte')} generator!`)
    )

    const prompts = getPrompts(this)

    return this.prompt(prompts).then(props => {
      saveConfig(this, props)
      compose(this, props)
    })
  }
}

/* Helper Functions */
function getProjectTypes () {
  return ['generic', 'server', 'static-site']
}

function getPrompts (generator) {
  return [
    {
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: generator.appname
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
      choices: getProjectTypes(),
      default: 'generic'
    },
    {
      type: 'confirm',
      name: 'gitHooks',
      message: 'Do you want to add linting to your precommit hooks?',
      default: false
    }
  ]
}

function saveConfig (generator, props) {
  generator.config.set('name', props.name)
  generator.config.set('description', props.description)
  generator.config.set('version', props.version)
  generator.config.set('projectType', props.projectType)
  generator.config.set('gitHooks', props.gitHooks)
}

function compose (generator, props) {
  getSubgenerators(props.projectType)
    .map(path => require.resolve(path))
    .map(sub => generator.composeWith(sub))
}

function getSubgenerators (projectType) {
  const subgenerators = ['common', projectType, 'package']

  return subgenerators.map(sub => `../${sub}`)
}
