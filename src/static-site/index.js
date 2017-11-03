import Generator from 'yeoman-generator'

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

    return this.prompt(prompts)
      .then(props => {
        this.props = props
      })
  }

  _files () {
    let staticFiles = [
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

    if (this.props.react) {
      staticFiles = [...staticFiles, 'src/App.js']
    }

    let tplFiles = [
      '.babelrc',
      'src/index.js',
      'test/ui/basic.js',
      'webpack.common.js'
    ]

    return {staticFiles, tplFiles}
  }

  writing () {
    const list = this._files()

    /* Writing */
    list.staticFiles.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })

    list.tplFiles.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          react: this.props.react
        }
      )
    })
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
