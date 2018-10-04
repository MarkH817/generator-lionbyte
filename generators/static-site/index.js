const Generator = require('yeoman-generator')

const { copy } = require('../utils')

/**
 * @param {{ react: boolean }} options
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
 * @param {{ react: boolean }} options
 */
const getAllDependencies = options => {
  const devDependencies = getDevDeps(options)
  const dependencies = getDependencies(options)

  return { devDependencies, dependencies }
}

/**
 * @param {{ react: boolean }} options
 */
const getDevDeps = options => {
  return [
    '@babel/core@latest',
    '@babel/plugin-syntax-dynamic-import@latest',
    '@babel/preset-env@latest',
    'autoprefixer@latest',
    'babel-core@7.0.0-bridge.0', // To allow Jest to work with Babel 7
    'babel-eslint@latest',
    'babel-loader@latest',
    'babel-plugin-dynamic-import-node@latest',
    'clean-webpack-plugin@latest',
    'css-loader@latest',
    'cssnano@latest',
    'less@latest',
    'less-loader@latest',
    'postcss-loader@latest',
    'style-loader@latest',
    'mini-css-extract-plugin@latest',
    'html-webpack-plugin@latest',
    'webpack@latest',
    'webpack-cli@latest',
    'webpack-dev-server@latest',
    'webpack-merge@latest'
  ].concat(
    options.react
      ? [
        '@types/react@latest',
        '@types/react-dom@latest',
        '@babel/preset-react@latest'
      ]
      : []
  )
}

/**
 * @param {{ react: boolean }} options
 */
const getDependencies = options => {
  return ['@babel/polyfill@latest'].concat(
    options.react ? ['react@latest', 'react-dom@latest'] : []
  )
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
      'pages/index.html',
      'src/styles/main.less',
      'src/index.js',
      'webpack.dev.js',
      'webpack.prod.js',
      'webpack.common.js'
    ]

    staticFiles.map(file => copy(this, file))

    this.fs.writeJSON(
      this.destinationPath('.babelrc'),
      getBabelrc({ react: this.config.get('react') })
    )
  }

  install () {
    const { devDependencies, dependencies } = getAllDependencies({
      react: this.config.get('react')
    })

    this.npmInstall(devDependencies, { saveDev: true })
    this.npmInstall(dependencies)
  }
}
