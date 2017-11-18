import gulp from 'gulp'
import path from 'path'
import jsdocmd from 'jsdoc-to-markdown'
import {generators} from './constants'
import {write} from './utils'

gulp.task('docs', () => {
  const target = path.join(__dirname, '../docs/API.md')
  const files = generators.map(gen => `../src/${gen}/*.js`)

  return jsdocmd.render({
    files: ['../src/*.js', ...files],
    sourceType: 'modules',
    separators: false
  })
    .then(output => write(target, output))
})
