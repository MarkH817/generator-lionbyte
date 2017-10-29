import Generator from 'yeoman-generator'

module.exports = class extends Generator {
  writing () {
    const filenames = [
      'src/index.js',
      '.babelrc',
      'gulpfile.babel.js'
    ]

    /* Writing */
    filenames.map(file => {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(file)
      )
    })
  }
}
