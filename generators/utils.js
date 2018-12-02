/**
 * Copy static template files
 * @param  {any} generator         Reference to generator instance
 * @param  {string} filename          File to copy.
 * @param  {string} [output=filename] File destination. Keeps the same filename by default.
 */
const copy = (generator, filename, output = filename) => {
  generator.fs.copy(
    generator.templatePath(filename),
    generator.destinationPath(output)
  )
}

/**
 * Copy dynamic template files with data
 * @param  {any} generator         Reference to generator instance
 * @param  {any} data              Data to write to the template file
 * @param  {string} filename          File to copy.
 * @param  {string} [output=filename] File destination. Keeps the same filename by default.
 */
const copyTpl = (generator, data, filename, output = filename) => {
  generator.fs.copyTpl(
    generator.templatePath(filename),
    generator.destinationPath(output),
    data
  )
}

/**
 * @param {any} generator
 * @returns {{ description: string, name: string, projectType: string, user: {name: string, email: string} }}
 */
const getProjectInfo = generator => ({
  description: generator.config.get('description'),
  name: generator.config.get('name'),
  projectType: generator.config.get('projectType'),
  user: {
    name: generator.user.git.name(),
    email: generator.user.git.email()
  }
})

const projectTypes = ['node', 'frontend']

/**
 * @template {any} T
 * @param {T} obj
 * @returns {T}
 */
const sortObj = obj => {
  let keys = Object.keys(obj).sort()
  let sorted = {}

  keys.forEach(key => {
    sorted[key] = obj[key]
  })

  // @ts-ignore
  return sorted
}

module.exports = {
  copy,
  copyTpl,
  getProjectInfo,
  projectTypes,
  sortObj
}
