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
          'babel-preset-env',
          {
            targets: {
              browsers: ['last 2 versions']
            },
            exclude: ['transform-regenerator']
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
        presets: this.props.react
          ? [...babelPresets, 'babel-preset-react']
          : babelPresets,
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
    'del-cli',
    'babel-core',
    'babel-eslint',
    'babel-preset-env',
    'babel-loader',
    'babel-plugin-syntax-dynamic-import',
    'postcss-loader',
    'autoprefixer',
    'css-loader',
    'cssnano',
    'less',
    'less-loader',
    'style-loader',
    'extract-text-webpack-plugin@next',
    'clean-webpack-plugin',
    'html-webpack-plugin@latest',
    'webpack-dev-server@latest',
    'webpack@4',
    'webpack-cli',
    'webpack-merge'
  ]

  if (react) {
    return [...list, 'babel-preset-react']
  } else {
    return list
  }
}

function getDependencies ({ react }) {
  const list = ['mini.css']

  if (react) {
    return [...list, 'react', 'react-dom']
  } else {
    return list
  }
}
