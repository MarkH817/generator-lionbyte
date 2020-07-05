const Generator = require('yeoman-generator')

const { copy } = require('../utils')

module.exports = class StaticSite extends Generator {
  prompting () {
    return this.prompt([
      {
        type: 'confirm',
        name: 'react',
        message: 'Include React?',
        default: false
      }
    ]).then(props => {
      this.config.set('react', props.react)
    })
  }

  writing () {
    const staticFiles = [
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
}

/**
 * @param {object} options
 * @param {boolean} [options.react]
 */
function getBabelrc (options) {
  const basePresets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        shippedProposals: true,
        useBuiltIns: 'usage',
        targets: { esmodules: true }
      }
    ]
  ].concat(options.react ? ['@babel/preset-react'] : [])

  const testPresets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: 'commonjs',
        shippedProposals: true,
        useBuiltIns: 'usage',
        targets: { node: 'current' }
      }
    ]
  ].concat(options.react ? ['@babel/preset-react'] : [])

  return { presets: basePresets, env: { test: { presets: testPresets } } }
}
