import gulp from 'gulp'
import browserSync from 'browser-sync'
import path from 'path'

gulp.task('watch', () => {
  browserSync.init({
    server: path.resolve(__dirname, '../dist')
  })

  gulp.watch('../src/**/*.js', ['js:dev'])
  gulp.watch('../styles/**/*.less', ['styles'])
  gulp.watch('../pages/**/*.ejs', ['pages'])
  gulp.watch('../dist/**/*.html', browserSync.reload)
})
