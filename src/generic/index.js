import Generator from 'yeoman-generator'
import {copy} from '../utils'

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

    return this.prompt(prompts)
      .then(props => {
        this.config.set('cli', props.cli)
        this.props = props
      })
  }

  writing () {
    const {staticFiles} = getFiles(this.props)

    /* Writing */
    staticFiles.map(file => copy(this, file))
  }

  install () {
    if (this.props.cli) {
      this.npmInstall([
        'chalk',
        'commander'
      ])
    }
  }
}

/* Helper Functions */
function getFiles (props) {
  const staticFiles = getStaticFiles(props)
  const tplFiles = getTplFiles(props)

  return {staticFiles, tplFiles}
}

function getStaticFiles (props) {
  let files = [
    'src/index.js',
    'tasks/build.js',
    'tasks/clean.js',
    'tasks/transpile.js',
    'tasks/watch.js',
    '.babelrc',
    'gulpfile.babel.js'
  ]

  if (props.cli) {
    files = [...files, 'src/cli.js']
  }

  return files
}

function getTplFiles (props) {
  let files = []

  return files
}
