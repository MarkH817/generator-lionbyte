import gulp from 'gulp'
import plumber from 'gulp-plumber'
import { generators } from './constants'

generators.map(gen => {
  gulp.task(`templates:${gen}`, () => {
    return gulp
      .src([`../src/${gen}/templates/**/*`], { dot: true })
      .pipe(plumber())
      .pipe(gulp.dest(`../generators/${gen}/templates`))
  })
})

gulp.task('templates', generators.map(gen => `templates:${gen}`))
