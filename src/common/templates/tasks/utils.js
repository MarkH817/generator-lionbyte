import fs from 'fs'

/**
 * fs.write function wrapped in a Promise
 * @param  {String} filename Filename
 * @param  {String} data     Content to be written
 * @return {Promis}          Promise
 */
export function write (filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, 'utf8', err => {
      if (err) reject(err)
      resolve()
    })
  })
}
