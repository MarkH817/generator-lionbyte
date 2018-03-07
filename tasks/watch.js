import gulp from 'gulp'
import { generators } from './constants'

gulp.task('watch', () => {
  gulp.watch('../src/**/*.js', ['transpile'])
  generators.map(gen =>
    gulp.watch(`../src/${gen}/templates/**/*`, [`templates:${gen}`])
  )
})
