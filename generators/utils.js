/**
 * Copy static template files
 * @param {import('yeoman-generator')} generator Reference to generator instance
 * @param {string} filename File to copy.
 * @param {string} [output=filename]
 * File destination. Keeps the same filename by default.
 */
function copy (generator, filename, output = filename) {
  generator.fs.copy(
    generator.templatePath(filename),
    generator.destinationPath(output)
  )
}

/**
 * Copy dynamic template files with data
 * @param {import('yeoman-generator')} generator Reference to generator instance
 * @param {any} data Data to write to the template file
 * @param {string} filename File to copy.
 * @param {string} [output=filename]
 * File destination. Keeps the same filename by default.
 */
function copyTpl (generator, data, filename, output = filename) {
  generator.fs.copyTpl(
    generator.templatePath(filename),
    generator.destinationPath(output),
    data
  )
}

/**
 * @param {import('yeoman-generator')} generator
 * @returns {{
 * description: string,
 * name: string, projectType: string, user: {name: string, email: string} }}
 */
function getProjectInfo (generator) {
  return {
    description: generator.config.get('description'),
    name: generator.config.get('name'),
    projectType: generator.config.get('projectType'),
    user: {
      name: generator.user.git.name(),
      email: generator.user.git.email()
    }
  }
}

/** @type {ReadonlyArray<string>} */
const projectTypes = ['node', 'frontend']

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function sortObj (obj) {
  const keys = Object.keys(obj).sort()
  const sorted = {}

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
