const Generator = require('yeoman-generator')
const { copy } = require('../utils')

module.exports = class Server extends Generator {
  writing () {
    return new Promise(resolve => {
      const { staticFiles } = getFiles()

      staticFiles.map(file => copy(this, file))
      resolve()
    })
  }

  install () {
    const { devDependencies, dependencies } = getAllDependencies()

    this.npmInstall(devDependencies, { saveDev: true })
    this.npmInstall(dependencies)
  }
}

function getFiles () {
  const staticFiles = getStaticFiles()
  const tplFiles = getTplFiles()

  return { staticFiles, tplFiles }
}

function getStaticFiles () {
  return [
    '.babelrc',
    'gulpfile.babel.js',
    'tasks/build.js',
    'tasks/transpile.js',
    'tasks/watch.js',
    'src/app.js',
    'src/index.js',
    'src/routes/index.js'
  ]
}

function getTplFiles () {
  return []
}

function getAllDependencies () {
  const devDependencies = getDevDeps()
  const dependencies = getDependencies()

  return { devDependencies, dependencies }
}

function getDevDeps () {
  return ['nodemon']
}

function getDependencies () {
  return ['body-parser', 'debug', 'express', 'morgan']
}
