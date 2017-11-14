import gulp from 'gulp'
import hub from 'gulp-hub'
import gulpSequence from 'gulp-sequence'

/* Reads all tasks from this glob */
hub(['./tasks/*.js'])

gulp.task('default', gulpSequence('build', 'watch'))
