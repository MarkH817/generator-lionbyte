import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {files, timeout} from './utils/config'

describe('generator-lionbyte:server', function () {
  this.timeout(timeout)

  const projectFiles = [
    'src/app.js',
    'src/routes/index.js'
  ]

  describe('scaffolds a server project', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing server',
        version: '0.0.0',
        projectType: 'server'
      })
    })

    it('creates files', () => {
      assert.file([
        ...files,
        ...projectFiles
      ])
    })
  })
})
