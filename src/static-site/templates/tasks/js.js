import gulp from 'gulp'
import plumber from 'gulp-plumber'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import configDev from '../webpack.dev'
import configProd from '../webpack.prod'
import browserSync from 'browser-sync'

const modes = ['dev', 'prod']

modes.map(mode => {
  gulp.task(`js:${mode}`, () => {
    let config = configDev
    if (mode === 'prod') config = configProd

    return gulp.src('../src/*.js')
      .pipe(plumber())
      .pipe(webpackStream(config, webpack))
      .pipe(gulp.dest('../dist/js'))
      .pipe(browserSync.stream())
  })
})
