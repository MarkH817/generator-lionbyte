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
      'gulpfile.babel.js',
      'webpack.dev.js',
      'webpack.prod.js'
    ]

    const filesWithParams = [
      '.babelrc',
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
      'gulp-sourcemaps',
      'gulp-webpack',
      'webpack',
      'webpack-merge'
    ], {
      saveDev: true
    })

    /* Optionally include react */
    if (this.props.react) {
      /* Install devDependencies */
      this.npmInstall([
        'babel-preset-react'
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
