const Generator = require('yeoman-generator')
const { copy } = require('../utils')

module.exports = class Server extends Generator {
  writing () {
    return new Promise(resolve => {
      const staticFiles = ['src/routes/index.js', 'src/app.js', 'src/index.js']

      staticFiles.map(file => copy(this, file))
      resolve()
    })
  }

  install () {
    this.npmInstall(['nodemon'], { saveDev: true })
    this.npmInstall(['body-parser', 'debug', 'express', 'morgan'])
  }
}
