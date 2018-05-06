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

    return this.prompt(prompts).then(props => (this.props = props))
  }

  writing () {
    return new Promise(resolve => {
      const babelPresets = [
        [
          'env',
          {
            modules: false,
            loose: true,
            useBuiltIns: true,
            targets: {
              browsers: ['defaults']
            }
          }
        ]
      ]

      const staticFiles = [
        'pages/index.html',
        'styles/main.less',
        'src/index.js',
        'webpack.dev.js',
        'webpack.prod.js',
        'webpack.common.js'
      ]

      staticFiles.map(file => copy(this, file))

      this.fs.writeJSON(this.destinationPath('.babelrc'), {
        presets: this.props.react ? [...babelPresets, 'react'] : babelPresets,
        plugins: ['syntax-dynamic-import']
      })

      resolve()
    })
  }

  install () {
    const { devDependencies, dependencies } = getAllDependencies(this.props)

    this.npmInstall(devDependencies, { saveDev: true })
    this.npmInstall(dependencies)
  }
}

function getAllDependencies (props) {
  const devDependencies = getDevDeps(props)
  const dependencies = getDependencies(props)

  return { devDependencies, dependencies }
}

function getDevDeps ({ react }) {
  const list = [
    'babel-core@latest',
    'babel-eslint@latest',
    'babel-loader@latest',
    'babel-plugin-dynamic-import-node@latest',
    'babel-plugin-syntax-dynamic-import@latest',
    'babel-polyfill@latest',
    'babel-preset-env@latest',
    'babel-register@latest',
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
  ]

  if (react) {
    return [...list, 'babel-preset-react@latest']
  } else {
    return list
  }
}

function getDependencies ({ react }) {
  if (react) {
    return ['react@latest', 'react-dom@latest']
  } else {
    return []
  }
}
