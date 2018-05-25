const Generator = require('yeoman-generator')

const { copy } = require('../utils')

module.exports = class StaticSite extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'confirm',
        name: 'react',
        message: 'Include React?',
        default: false
      }
    ]

    return this.prompt(prompts).then(props => {
      /** @type {{ react: boolean }} */
      this.props = { react: props.react }
    })
  }

  writing () {
    const staticFiles = [
      'pages/index.html',
      'styles/main.less',
      'src/index.js',
      'webpack.dev.js',
      'webpack.prod.js',
      'webpack.common.js'
    ]

    staticFiles.map(file => copy(this, file))

    this.fs.writeJSON(this.destinationPath('.babelrc'), getBabelrc(this.props))
  }

  install () {
    const { devDependencies, dependencies } = getAllDependencies(this.props)

    this.npmInstall(devDependencies, { saveDev: true })
    this.npmInstall(dependencies)
  }
}

function getBabelrc ({ react }) {
  const basePresets = [
    [
      'env',
      {
        modules: false,
        loose: true,
        useBuiltIns: false,
        targets: { browsers: ['defaults'] }
      }
    ]
  ].concat(react ? ['react'] : [])

  const basePlugins = ['syntax-dynamic-import']

  const testPresets = [
    [
      'env',
      {
        modules: 'commonjs',
        loose: true,
        useBuiltIns: false,
        targets: { node: 'current' }
      }
    ]
  ].concat(react ? ['react'] : [])

  const testPlugins = ['dynamic-import-node']

  return {
    presets: basePresets,
    plugins: basePlugins,
    env: {
      test: {
        presets: testPresets,
        plugins: testPlugins
      }
    }
  }
}

function getAllDependencies (props) {
  const devDependencies = getDevDeps(props)
  const dependencies = getDependencies(props)

  return { devDependencies, dependencies }
}

function getDevDeps ({ react }) {
  return [
    'babel-core@latest',
    'babel-eslint@latest',
    'babel-loader@latest',
    'babel-plugin-dynamic-import-node@latest',
    'babel-plugin-syntax-dynamic-import@latest',
    'babel-polyfill@latest',
    'babel-preset-env@latest',
    'babel-register@latest',
    'cross-env@latest',
    'postcss-loader@latest',
    'autoprefixer@latest',
    'css-loader@latest',
    'cssnano@latest',
    'less@latest',
    'less-loader@latest',
    'style-loader@latest',
    'mini-css-extract-plugin@latest',
    'clean-webpack-plugin@latest',
    'html-webpack-plugin@latest',
    'webpack-dev-server@latest',
    'webpack@latest',
    'webpack-cli@latest',
    'webpack-merge@latest'
  ].concat(react ? ['babel-preset-react@latest'] : [])
}

function getDependencies ({ react }) {
  if (react) {
    return ['react@latest', 'react-dom@latest']
  } else {
    return []
  }
}
