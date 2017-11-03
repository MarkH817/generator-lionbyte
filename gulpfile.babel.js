import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import gulpSequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import del from 'del'

const generators = [
  'app',
  'common',
  'generic',
  'package',
  'static-site'
]

gulp.task('clean', () => {
  return del('generators/**/*')
})

/* Create template subtasks */
generators.map(gen => {
  gulp.task(`templates:${gen}`, () => {
    return gulp.src([`src/${gen}/templates/**/*`], {dot: true})
      .pipe(plumber())
      .pipe(gulp.dest(`generators/${gen}/templates`))
  })
})

gulp.task('templates', generators.map(gen => `templates:${gen}`))

gulp.task('transpile', () => {
  return gulp.src([
    'src/**/*.js',
    '!src/*/templates/**/*.js'
  ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('generators/'))
})

gulp.task('build', gulpSequence('clean', ['transpile', 'templates']))

gulp.task('watch', () => {
  gulp.watch('src/**/*.js', ['transpile'])
  generators.map(gen => gulp.watch(`src/${gen}/templates/**/*`, [`templates:${gen}`]))
})

gulp.task('default', gulpSequence('build', 'watch'))
