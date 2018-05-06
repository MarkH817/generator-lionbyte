/**
 * Copy static template files
 * @param  {Object} generator         Reference to generator instance
 * @param  {String} filename          File to copy.
 * @param  {String} [output=filename] File destination. Keeps the same filename by default.
 */
const copy = (generator, filename, output = filename) => {
  generator.fs.copy(
    generator.templatePath(filename),
    generator.destinationPath(output)
  )
}

/**
 * Copy dynamic template files with data
 * @param  {Object} generator         Reference to generator instance
 * @param  {Object} data              Data to write to the template file
 * @param  {String} filename          File to copy.
 * @param  {String} [output=filename] File destination. Keeps the same filename by default.
 */
const copyTpl = (generator, data, filename, output = filename) => {
  generator.fs.copyTpl(
    generator.templatePath(filename),
    generator.destinationPath(output),
    data
  )
}

const sortObj = obj => {
  let keys = Object.keys(obj).sort()
  let sorted = {}

  keys.map(key => {
    sorted[key] = obj[key]
  })

  return sorted
}

module.exports = {
  copy,
  copyTpl,
  sortObj
}
