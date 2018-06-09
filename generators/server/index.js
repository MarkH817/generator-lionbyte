const Generator = require('yeoman-generator')

const { copy } = require('../utils')

module.exports = class Server extends Generator {
  writing () {
    const staticFiles = ['src/routes/index.js', 'src/app.js', 'src/index.js']

    staticFiles.map(file => copy(this, file))
  }

  install () {
    this.npmInstall(
      [
        '@types/body-parser@latest',
        '@types/debug@latest',
        '@types/express@latest',
        '@types/morgan@latest',
        '@types/node@latest',
        'nodemon@latest'
      ],
      { saveDev: true }
    )

    this.npmInstall([
      'body-parser@latest',
      'debug@latest',
      'express@latest',
      'morgan@latest'
    ])
  }
}
