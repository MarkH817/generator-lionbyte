const Generator = require('yeoman-generator')

const { copy } = require('../utils')

module.exports = class Node extends Generator {
  writing() {
    const staticFiles = ['src/index.js']

    staticFiles.map(file => copy(this, file))
  }
}
