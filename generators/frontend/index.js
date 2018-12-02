const Generator = require('yeoman-generator')

const { copy } = require('../utils')

/**
 * @param {object} options
 */
const getBabelrc = options => {
  const basePresets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: { browsers: ['defaults'] }
      }
    ]
  ].concat(options.react ? ['@babel/preset-react'] : [])

  const testPresets = [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'usage',
        targets: { node: 'current' }
      }
    ]
  ].concat(options.react ? ['@babel/preset-react'] : [])

  return {
    presets: basePresets,
    plugins: ['@babel/syntax-dynamic-import'],
    env: {
      test: {
        presets: testPresets,
        plugins: ['dynamic-import-node']
      }
    }
  }
}

/**
 * @param {object} options
 */
const getAllDependencies = options => {
  const devDependencies = getDevDeps(options)
  const dependencies = getDependencies(options)

  return { devDependencies, dependencies }
}

/**
 * @param {object} options
 */
const getDevDeps = options => {
  return [
    '@babel/core',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/preset-env',
    'autoprefixer',
    'babel-core@7.0.0-bridge.0', // To allow Jest to work with Babel 7
    'babel-loader',
    'babel-plugin-dynamic-import-node',
    'clean-webpack-plugin',
    'css-loader',
    'cssnano',
    'less',
    'less-loader',
    'postcss-loader',
    'style-loader',
    'mini-css-extract-plugin',
    'html-webpack-plugin',
    'webpack',
    'webpack-cli',
    'webpack-dev-server',
    'webpack-merge'
  ].concat(options.react ? ['@babel/preset-react'] : [])
}

/**
 * @param {object} options
 */
const getDependencies = options => {
  return ['@babel/polyfill'].concat(options.react ? ['react', 'react-dom'] : [])
}

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
      this.config.set('react', props.react)
    })
  }

  writing () {
    const staticFiles = [
      'src/styles/main.less',
      'src/index.js',
      'static/index.html',
      'webpack.dev.js',
      'webpack.prod.js',
      'webpack.common.js'
    ]

    staticFiles.forEach(file => copy(this, file))

    this.fs.writeJSON(
      this.destinationPath('.babelrc'),
      getBabelrc(this.config.getAll())
    )
  }

  install () {
    const { devDependencies, dependencies } = getAllDependencies(
      this.config.getAll()
    )

    this.npmInstall(devDependencies, { saveDev: true })
    this.npmInstall(dependencies)
  }
}
