import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

gulp.task('build', gulpSequence('clean', ['js:dev', 'styles', 'pages']))
gulp.task('build:prod', gulpSequence('clean', ['js:prod', 'styles', 'pages']))
