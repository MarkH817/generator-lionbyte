const Generator = require('yeoman-generator')

const { getProjectInfo, sortObj } = require('../utils')

/**
 * @param {string} type
 * @returns {Record<string, string>}
 */
function createScripts (type) {
  const scripts = {
    format: 'npm run prettier && npm run lint -- --fix',
    lint: 'eslint --ignore-path .gitignore .',
    prettier:
      'prettier --ignore-path .gitignore --write "**/*.+(js|json|yml|yaml|css|less|ts|md|graphql|mdx|html)"',
    test: 'npm run type && jest --coverage',
    type: 'tsc --pretty'
  }

  switch (type) {
    case 'frontend':
      Object.assign(scripts, {
        build: 'webpack --config webpack.prod.js',
        dev: 'webpack-dev-server --config webpack.dev.js --open'
      })
      break

    case 'node':
    default:
      Object.assign(scripts, { start: 'node src' })
  }

  return sortObj(scripts)
}

module.exports = class Package extends Generator {
  writing () {
    const { description, name, user, projectType } = getProjectInfo(this)

    const scripts = createScripts(projectType)

    /** @type {PackageJSON} */
    const fullPackage = {
      name,
      version: '0.0.0',
      description,
      scripts,
      license: 'MIT',
      main: 'src/index.js',
      author: `${user.name} <${user.email}>`,
      devDependencies: {},
      dependencies: {}
    }

    this.fs.writeJSON(this.destinationPath('package.json'), fullPackage)
  }
}
