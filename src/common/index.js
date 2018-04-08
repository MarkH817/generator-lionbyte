const Generator = require('yeoman-generator')
const { copy, copyTpl } = require('../utils')

module.exports = class Common extends Generator {
  writing () {
    return new Promise(resolve => {
      const { staticFiles, tplFiles } = getFiles()
      const data = getData(this)

      staticFiles.map(file => copy(this, file))
      tplFiles.map(file => copyTpl(this, data, file))
      copy(this, '_gitignore', '.gitignore')

      resolve()
    })
  }

  install () {
    this.npmInstall(
      [
        'chai@latest',
        'coveralls@latest',
        'mocha@latest',
        'nyc@latest',
        'standard@latest',
        'prettier@latest',
        'husky@next',
        'lint-staged@latest'
      ],
      {
        saveDev: true
      }
    )
  }
}

/* Helper Functions */
function getFiles () {
  const staticFiles = getStaticFiles()
  const tplFiles = getTplFiles()

  return { staticFiles, tplFiles }
}

function getStaticFiles () {
  return [
    '.github/ISSUE_TEMPLATE.md',
    '.github/PULL_REQUEST_TEMPLATE.md',
    'test/index.js',
    '.editorconfig',
    '.gitattributes',
    '.travis.yml',
    'CHANGELOG.md',
    'CONTRIBUTING.md'
  ]
}

function getTplFiles () {
  return ['CODE_OF_CONDUCT.md', 'LICENSE.md', 'README.md']
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
