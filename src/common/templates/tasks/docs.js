import gulp from 'gulp'
import path from 'path'
import jsdocmd from 'jsdoc-to-markdown'
import {write} from './utils'

gulp.task('docs', () => {
  const target = path.join(__dirname, '../docs/API.md')

  return jsdocmd.render({files: '../src/**/*.js'})
    .then(output => write(target, output))
})
