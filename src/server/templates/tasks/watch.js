import gulp from 'gulp'

gulp.task('watch', () => {
  gulp.watch('../src/**/*.js', ['transpile'])
})
