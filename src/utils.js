export function copy (generator, filename, output = filename) {
  generator.fs.copy(
    generator.templatePath(filename),
    generator.destinationPath(output)
  )
}

export function copyTpl (generator, data, filename, output = filename) {
  generator.fs.copyTpl(
    generator.templatePath(filename),
    generator.destinationPath(output),
    data
  )
}
