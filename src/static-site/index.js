import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'confirm',
        name: 'react',
        message: 'Include React?',
        default: false
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        this.props = props
      })
  }

  writing () {
    const filenames = [
      'pages/components/header.ejs',
      'pages/components/metas.ejs',
      'pages/components/stylesheets.ejs',
      'pages/views/index.ejs',
      'styles/main.less',
      'test/ui/index.js',
      'gulpfile.babel.js',
      'webpack.dev.js',
      'webpack.prod.js'
    ]

    const filesWithParams = [
      '.babelrc',
      'src/index.js',
      'test/ui/basic.js',
      'webpack.common.js'
    ]

    /* Writing */
    filenames.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })

    filesWithParams.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          react: this.props.react
        }
      )
    })

    /* Add App.js for react projects */
    if (this.props.react) {
      this.fs.copy(
        this.templatePath('src/App.js'),
        this.destinationPath('src/App.js')
      )
    }
  }

  install () {
    /* Install devDependencies */
    this.npmInstall([
      'autoprefixer',
      'browser-sync',
      'babel-loader',
      'cssnano',
      'gulp-ejs',
      'gulp-htmlmin',
      'gulp-less',
      'gulp-postcss',
      'gulp-webpack',
      'node-static',
      'testcafe',
      'webpack',
      'webpack-merge'
    ], {
      saveDev: true
    })

    /* Optionally include react */
    if (this.props.react) {
      /* Install devDependencies */
      this.npmInstall([
        'babel-preset-react',
        'testcafe-react-selectors'
      ], {
        saveDev: true
      })

      /* Install dependencies */
      this.npmInstall([
        'react',
        'react-dom'
      ])
    }
  }
}
