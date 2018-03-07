const files = {
  common: [
    '.github/ISSUE_TEMPLATE.md',
    '.github/PULL_REQUEST_TEMPLATE.md',
    'test/index.js',
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.npmignore',
    '.travis.yml',
    'CHANGELOG.md',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'LICENSE.md',
    'README.md'
  ],
  generic: ['src/index.js'],
  package: ['package.json'],
  server: ['src/routes/index.js', 'src/app.js', 'src/index.js'],
  'static-site': [
    'pages/index.html',
    'src/index.js',
    'styles/main.less',
    '.babelrc',
    'webpack.common.js',
    'webpack.dev.js',
    'webpack.prod.js'
  ]
}

const timeout = 10000

module.exports = {
  files,
  timeout
}
