const Generator = require('yeoman-generator')

const { getProjectInfo, sortObj } = require('../utils')

/**
 * @param {string} type
 */
function createScripts (type) {
  const scripts = {
    format: 'npm run prettier && npm run lint -- --fix',
    lint: 'eslint --ignore-path .gitignore .',
    prettier:
      // eslint-disable-next-line max-len
      'prettier --ignore-path .gitignore --write "**/*.+(js|json|yml|yaml|css|less|ts|md|graphql|mdx|html)"',
    test: 'npm run type && jest --coverage',
    type: 'tsc --pretty'
  }

  switch (type) {
    case 'frontend':
      Object.assign(scripts, {
        build: 'webpack --node-env=production --config webpack/webpack.prod.js',
        dev: 'webpack serve --config webpack/webpack.dev.js'
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
