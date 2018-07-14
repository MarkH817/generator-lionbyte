const files = {
  common: [
    '.github/ISSUE_TEMPLATE.md',
    '.github/PULL_REQUEST_TEMPLATE.md',
    'test/index.test.js',
    '.editorconfig',
    '.gitattributes',
    '.gitignore',
    '.travis.yml',
    'CHANGELOG.md',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'LICENSE.md',
    'README.md',
    'tsconfig.json'
  ],
  generic: ['src/index.js'],
  package: ['package.json'],
  server: ['src/routes/index.js', 'src/app.js', 'src/index.js'],
  'static-site': [
    'pages/index.html',
    'src/common.js',
    'src/index.js',
    'src/styles/main.less',
    '.babelrc',
    'webpack.common.js',
    'webpack.dev.js',
    'webpack.prod.js'
  ]
}

module.exports = {
  files
}
