import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import gulpSequence from 'gulp-sequence'
import del from 'del'

gulp.task('clean', () => {
  return del('generators/**/*')
})

gulp.task('templates:app', () => {
  return gulp.src('src/app/templates/**/*')
  .pipe(plumber())
  .pipe(gulp.dest('generators/app/templates'))
})

gulp.task('templates', [
  'templates:app'
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
})

gulp.task('default', gulpSequence('build', 'watch'))
