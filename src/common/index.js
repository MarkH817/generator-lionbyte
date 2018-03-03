const Generator = require('yeoman-generator')
const { copy, copyTpl } = require('../utils')

module.exports = class Common extends Generator {
  writing () {
    return new Promise(resolve => {
      const { staticFiles, tplFiles } = getFiles(this.props)
      const data = getData(this)

      staticFiles.map(file => copy(this, file))
      tplFiles.map(file => copyTpl(this, data, file))
      copy(this, '_gitignore', '.gitignore')

      resolve()
    })
  }

  install () {
    /* Install devDependencies */
    const { devDependencies } = getAllDependencies(this.props)
    this.npmInstall(devDependencies, { saveDev: true })
  }
}

/* Helper Functions */
function getFiles (props) {
  const staticFiles = getStaticFiles(props)
  const tplFiles = getTplFiles(props)

  return { staticFiles, tplFiles }
}

function getStaticFiles (props) {
  let files = [
    '.editorconfig',
    '.gitattributes',
    '.travis.yml',
    'docs/ISSUE_TEMPLATE.md',
    'docs/PULL_REQUEST_TEMPLATE.md',
    'tasks/clean.js',
    'tasks/utils.js',
    'test/index.js',
    'CHANGELOG.md',
    'CONTRIBUTING.md'
  ]

  return files
}

function getTplFiles (props) {
  let files = ['.npmignore', 'CODE_OF_CONDUCT.md', 'LICENSE.md', 'README.md']

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

  return { devDependencies, dependencies }
}

function getDevDeps (props) {
  return [
    'babel-cli',
    'babel-core',
    'babel-preset-env',
    'babel-register',
    'chai',
    'coveralls',
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
