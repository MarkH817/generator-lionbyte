import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'

gulp.task('transpile', () => {
  return gulp.src([
    '../src/**/*.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../dist/'))
})
