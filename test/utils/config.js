const files = [
  '.babelrc',
  '.editorconfig',
  '.gitignore',
  '.npmignore',
  '.gitattributes',
  '.travis.yml',
  'docs/ISSUE_TEMPLATE.md',
  'docs/PULL_REQUEST_TEMPLATE.md',
  'src/index.js',
  'tasks/build.js',
  'tasks/clean.js',
  'tasks/utils.js',
  'tasks/watch.js',
  'test/index.js',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE.md',
  'README.md',
  'package.json',
  'gulpfile.babel.js'
]

const timeout = 10000

module.exports = {
  files,
  timeout
}
