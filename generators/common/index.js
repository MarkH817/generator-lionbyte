const Generator = require('yeoman-generator')

const { copy, copyTpl, getProjectInfo, sortObj } = require('../utils')

const createEslintConfig = options => {
  const { projectType } = options

  const config = {
    extends: ['standard', 'standard-jsx'],
    rules: {
      'no-var': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error'
    },
    parserOptions: {
      ecmaVersion: 8
    },
    globals: {
      afterAll: true,
      afterEach: true,
      beforeAll: true,
      beforeEach: true,
      describe: true,
      expect: true,
      jest: true,
      test: true
    }
  }

  if (projectType === 'frontend') {
    config.parser = 'babel-eslint'
  }

  return sortObj(config)
}

module.exports = class Common extends Generator {
  writing () {
    const eslintConfig = createEslintConfig(this.config.getAll())
    const data = getProjectInfo(this)
    const tplFiles = ['CODE_OF_CONDUCT.md', 'LICENSE.md', 'README.md']
    const staticFiles = [
      '.github/ISSUE_TEMPLATE.md',
      '.github/PULL_REQUEST_TEMPLATE.md',
      '.editorconfig',
      '.gitattributes',
      '.prettierrc',
      '.travis.yml',
      'CHANGELOG.md',
      'CONTRIBUTING.md'
    ]

    if (this.config.get('gitHooks')) {
      staticFiles.push('.huskyrc', '.lintstagedrc')
    }

    staticFiles.forEach(file => copy(this, file))
    tplFiles.forEach(file => copyTpl(this, data, file))

    copy(this, '_gitignore', '.gitignore')
    copy(this, 'test/index.js', 'test/index.test.js')

    this.fs.writeJSON(this.destinationPath('.eslintrc.json'), eslintConfig)
  }

  install () {
    const devDependencies = [
      'jest',
      'eslint',
      'eslint-config-standard',
      'eslint-config-standard-jsx',
      'eslint-plugin-import',
      'eslint-plugin-node',
      'eslint-plugin-promise',
      'eslint-plugin-react',
      'eslint-plugin-standard',
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
