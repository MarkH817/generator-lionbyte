import gulp from 'gulp'
import browserSync from 'browser-sync'

gulp.task('watch', () => {
  browserSync.init({
    server: '../dist'
  })

  gulp.watch('../src/**/*.js', ['js:dev'])
  gulp.watch('../styles/**/*.less', ['styles'])
  gulp.watch('../pages/**/*.ejs', ['pages'])
  gulp.watch('../dist/**/*.html', browserSync.reload)
})
