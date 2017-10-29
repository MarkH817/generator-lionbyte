import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import gulpSequence from 'gulp-sequence'
import del from 'del'

gulp.task('clean', () => {
  return del('generators/**/*')
})

gulp.task('templates:app', () => {
  return gulp.src(['src/app/templates/**/*'], {
    dot: true
  })
  .pipe(plumber())
  .pipe(gulp.dest('generators/app/templates'))
})

gulp.task('templates:common', () => {
  return gulp.src(['src/common/templates/**/*'], {
    dot: true
  })
  .pipe(plumber())
  .pipe(gulp.dest('generators/common/templates'))
})

gulp.task('templates:generic', () => {
  return gulp.src(['src/generic/templates/**/*'], {
    dot: true
  })
  .pipe(plumber())
  .pipe(gulp.dest('generators/generic/templates'))
})

gulp.task('templates:static-site', () => {
  return gulp.src(['src/static-site/templates/**/*'], {
    dot: true
  })
  .pipe(plumber())
  .pipe(gulp.dest('generators/static-site/templates'))
})

gulp.task('templates', [
  'templates:app',
  'templates:common',
  'templates:generic',
  'templates:static-site'
])

gulp.task('transpile', () => {
  return gulp.src([
    'src/**/*.js',
    '!src/*/templates/**/*.js'
  ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('generators/'))
})

gulp.task('build', gulpSequence('clean', ['transpile', 'templates']))

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['transpile'])
  gulp.watch('src/app/templates/**/*', ['templates:app'])
  gulp.watch('src/common/templates/**/*', ['templates:common'])
  gulp.watch('src/static-site/templates/**/*', ['templates:static-site'])
})

gulp.task('default', gulpSequence('build', 'watch'))
