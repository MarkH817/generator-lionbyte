const Generator = require('yeoman-generator')

const { copy, copyTpl } = require('../utils')

module.exports = class StaticSite extends Generator {
  prompting() {
    return this.prompt([
      {
        type: 'confirm',
        name: 'react',
        message: 'Include React?',
        'default': false
      }
    ]).then(props => {
      this.config.set('react', props.react)
    })
  }

  writing() {
    const config = this.config.getAll()

    const templateFiles = [
      { from: 'webpack/webpack.dev.js.ejs', to: 'webpack/webpack.dev.js' }
    ]
    const staticFiles = [
      'src/images/.gitkeep',
      'src/styles/.gitkeep',
      'src/index.js',
      'webpack/postcss.config.js',
      'webpack/template.html',
      'webpack/webpack.prod.js',
      'webpack/webpack.common.js'
    ]

    templateFiles.forEach(file => copyTpl(this, config, file.from, file.to))
    staticFiles.forEach(file => copy(this, file))

    this.fs.writeJSON(this.destinationPath('.babelrc'), getBabelrc(config))
  }
}

/**
 * @param {object} options
 * @param {boolean} [options.react]
 * @returns {import('@babel/core').TransformOptions}
 */
function getBabelrc(options) {
  /** @type {import('@babel/core').TransformOptions['presets']} */
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
    ],
    '@babel/preset-typescript'
  ]

  if (options.react) {
    basePresets.push(['@babel/preset-react', { runtime: 'automatic' }])
  }

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
  ]

  return {
    presets: basePresets,
    env: {
      development: {
        plugins: options.react ? ['react-refresh/babel'] : []
      },
      test: { presets: testPresets }
    }
  }
}
