import Generator from 'yeoman-generator'
import {copy, copyTpl} from '../utils'

module.exports = class Common extends Generator {
  writing () {
    const {staticFiles, tplFiles} = getFiles(this.props)
    const data = getData(this)

    /* Writing */
    staticFiles.map(file => copy(this, file))
    tplFiles.map(file => copyTpl(this, data, file))

    /* Must be manually renamed
      NPM keeps deleting this file */
    copy(this, '_gitignore', '.gitignore')
  }

  install () {
    /* Install devDependencies */
    const {devDependencies} = getAllDependencies(this.props)
    this.npmInstall(devDependencies, {
      saveDev: true
    })
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
    'test/index.js',
    '.editorconfig',
    '.gitattributes',
    'CHANGELOG.md',
    'docs/ISSUE_TEMPLATE.md',
    'docs/PULL_REQUEST_TEMPLATE.md',
    'tasks/clean.js',
    'CONTRIBUTING.md'
  ]

  return files
}

function getTplFiles (props) {
  let files = [
    '.travis.yml',
    'LICENSE.md',
    'README.md',
    'CODE_OF_CONDUCT.md',
    '.npmignore'
  ]

  return files
}

function getData (generator) {
  return {
    name: generator.config.get('name'),
    description: generator.config.get('description'),
    user: {
      name: generator.user.git.name(),
      email: generator.user.git.email()
    },
    projectType: generator.config.get('projectType')
  }
}

function getAllDependencies (props) {
  const devDependencies = getDevDeps(props)
  const dependencies = getDependencies(props)

  return {devDependencies, dependencies}
}

function getDevDeps (props) {
  return [
    'babel-cli',
    'babel-core',
    'babel-preset-env',
    'babel-register',
    'coveralls',
    'chai',
    'del',
    'gulp',
    'gulp-babel',
    'gulp-hub',
    'gulp-plumber',
    'gulp-sequence',
    'gulp-sourcemaps',
    'mocha',
    'nyc',
    'standard'
  ]
}

function getDependencies (props) {
  return []
}
