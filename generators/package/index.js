const Generator = require('yeoman-generator')

const { getProjectInfo, sortObj } = require('../utils')

/**
 * @param {string} type
 * @param {boolean} gitHooks
 * @param {string} command
 * @returns {PackageJSON}
 */
const createPackageFile = (type, gitHooks, command = null) => {
  /** @type {PackageJSON} */
  const base = {
    license: 'MIT',
    main: 'src/index.js',
    scripts: {
      lint: 'standard',
      'lint:fix': 'prettier --write **/*.js && standard --fix',
      'lint:type': 'tsc --pretty',
      test: 'standard && tsc --pretty && jest --coverage'
    },
    prettier: {
      semi: false,
      singleQuote: true
    },
    standard: {
      globals: [
        'afterAll',
        'afterEach',
        'beforeAll',
        'beforeEach',
        'describe',
        'expect',
        'jest',
        'test'
      ],
      ignore: []
    }
  }

  let { scripts, standard } = base
  const others = {}

  if (gitHooks) {
    others['husky'] = {
      hooks: {
        'pre-commit': ['lint-staged']
      }
    }

    others['lint-staged'] = {
      '*.js': ['prettier --write', 'standard --fix', 'git add'],
      '*.{md,less}': ['prettier --write', 'git add']
    }
  }

  switch (type) {
    case 'static-site':
      scripts = Object.assign({}, scripts, {
        dev: 'webpack-dev-server --config webpack.dev.js --open',
        build: 'webpack --config webpack.prod.js'
      })
      standard = Object.assign({}, standard, { parser: 'babel-eslint' })
      break

    case 'server':
      scripts = Object.assign({}, scripts, {
        dev: 'nodemon src',
        start: 'node src'
      })
      break

    case 'generic':
    default:
      if (command) {
        others.bin = { [command]: 'src/cli' }
      }

      scripts = Object.assign({}, scripts, { start: 'node src' })
  }

  return Object.assign({}, base, others, {
    scripts: sortObj(scripts),
    standard
  })
}

module.exports = class Package extends Generator {
  writing () {
    const {
      description,
      name,
      version,
      user: { name: userName, email: userEmail }
    } = getProjectInfo(this)

    const command = this.config.get('command') || ''

    const packageInfo = createPackageFile(
      this.config.get('projectType'),
      this.config.get('gitHooks'),
      command.length !== 0 ? command : undefined
    )

    /** @type {PackageJSON} */
    const fullPackageJSON = Object.assign(
      {
        name,
        version,
        description,
        author: `${userName} <${userEmail}>`
      },
      packageInfo
    )

    this.fs.writeJSON(this.destinationPath('package.json'), fullPackageJSON)
  }
}
