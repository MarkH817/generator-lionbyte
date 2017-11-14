import gulp from 'gulp'
import ejs from 'gulp-ejs'
import htmlmin from 'gulp-htmlmin'
import plumber from 'gulp-plumber'
import browserSync from 'browser-sync'

gulp.task('pages', () => {
  return gulp.src('../pages/views/**/*.ejs')
    .pipe(plumber())
    .pipe(ejs({}, {}, {
      ext: '.html'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('../dist'))
    .pipe(browserSync.stream())
})
