import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import gulpSequence from 'gulp-sequence'
import del from 'del'

gulp.task('clean', () => {
  return del('dist/**/*')
})

gulp.task('transpile', () => {
  return gulp.src([
    'src/**/*.js'
  ])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('dist/'))
})

gulp.task('build', gulpSequence('clean', ['transpile']))

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['transpile'])
})

gulp.task('default', gulpSequence('build', 'watch'))
