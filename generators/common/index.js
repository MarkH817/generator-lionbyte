const Generator = require('yeoman-generator')

const { copy, copyTpl, getProjectInfo } = require('../utils')

module.exports = class Common extends Generator {
  writing () {
    const data = getProjectInfo(this)
    const tplFiles = ['CODE_OF_CONDUCT.md', 'LICENSE.md', 'README.md']
    const staticFiles = [
      '.editorconfig',
      '.gitattributes',
      '.prettierrc',
      '.travis.yml',
      'CONTRIBUTING.md'
    ]

    if (this.config.get('gitHooks')) {
      staticFiles.push('.huskyrc', '.lintstagedrc')
    }

    staticFiles.forEach(file => copy(this, file))
    tplFiles.forEach(file => copyTpl(this, data, file))

    copy(this, '_gitignore', '.gitignore')
    copy(this, 'test/index.js', 'test/index.test.js')

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), {
      extends: ['@lionbyte']
    })
  }

  install () {
    const devDependencies = [
      '@lionbyte/eslint-config',
      'eslint',
      'jest',
      'prettier'
    ]

    const { gitHooks, projectType } = this.config.getAll()

    if (gitHooks) {
      devDependencies.push('husky', 'lint-staged')
    }

    if (projectType === 'frontend') {
      devDependencies.push('babel-jest', 'babel-eslint')
    }

    this.npmInstall(devDependencies, { saveDev: true })
  }
}
