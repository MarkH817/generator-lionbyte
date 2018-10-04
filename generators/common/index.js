const Generator = require('yeoman-generator')

const { copy, copyTpl, getProjectInfo } = require('../utils')

module.exports = class Common extends Generator {
  writing () {
    const staticFiles = [
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.editorconfig',
      '.gitattributes',
      '.travis.yml',
      'CHANGELOG.md',
      'CONTRIBUTING.md'
    ]
    const tplFiles = ['CODE_OF_CONDUCT.md', 'LICENSE.md', 'README.md']
    const data = getProjectInfo(this)

    staticFiles.map(file => copy(this, file))
    tplFiles.map(file => copyTpl(this, data, file))
    copy(this, '_gitignore', '.gitignore')
    copy(this, 'test/index.js', 'test/index.test.js')
  }

  install () {
    const gitHooks = this.config.get('gitHooks')

    const packages = [
      'jest@latest',
      'babel-jest@latest',
      'standard@latest',
      'prettier@latest',
      'typescript@latest'
    ].concat(gitHooks ? ['husky@latest', 'lint-staged@latest'] : [])

    this.npmInstall(packages, { saveDev: true })
  }
}
