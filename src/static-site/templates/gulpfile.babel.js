import gulp from 'gulp'
import ejs from 'gulp-ejs'
import htmlmin from 'gulp-htmlmin'
import less from 'gulp-less'
import plumber from 'gulp-plumber'
import postcss from 'gulp-postcss'
import gulpSequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import gulpWebpack from 'gulp-webpack'
import webpack from 'webpack'
import configDev from './webpack.dev'
import configProd from './webpack.prod'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import cssnano from 'cssnano'
import del from 'del'

const modes = ['dev', 'prod']

gulp.task('clean', () => {
  return del('dist/**/*')
})

modes.map(mode => {
  gulp.task(`js:${mode}`, () => {
    let config = configDev
    if (mode === 'prod') config = configProd

    return gulp.src('src/*.js')
      .pipe(plumber())
      .pipe(gulpWebpack(config, webpack))
      .pipe(gulp.dest('dist/js'))
      .pipe(browserSync.stream())
  })
})

gulp.task('styles', () => {
  let processors = [
    autoprefixer(),
    cssnano()
  ]

  return gulp.src('styles/*.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('pages', () => {
  return gulp.src('pages/views/**/*.ejs')
    .pipe(plumber())
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
})

gulp.task('build', gulpSequence('clean', ['js:dev', 'styles', 'pages']))

gulp.task('build:prod', gulpSequence('clean', ['js:prod', 'styles', 'pages']))

gulp.task('watch', () => {
  browserSync.init({
    server: 'dist'
  })

  gulp.watch('src/**/*.js', ['js:dev'])
  gulp.watch('styles/**/*.less', ['styles'])
  gulp.watch('pages/**/*.ejs', ['pages'])
  gulp.watch('dist/**/*.html', browserSync.reload)
})

gulp.task('default', gulpSequence('build', 'watch'))
