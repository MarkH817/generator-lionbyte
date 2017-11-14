import gulp from 'gulp'
import hub from 'gulp-hub'
import gulpSequence from 'gulp-sequence'

hub(['./tasks/*.js'])

gulp.task('default', gulpSequence('build', 'watch'))
