import gulp from 'gulp'
import plumber from 'gulp-plumber'
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'autoprefixer'
import browserSync from 'browser-sync'
import cssnano from 'cssnano'

gulp.task('styles', () => {
  let processors = [
    autoprefixer(),
    cssnano()
  ]

  return gulp.src('../styles/*.less')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('../dist/css'))
    .pipe(browserSync.stream())
})
