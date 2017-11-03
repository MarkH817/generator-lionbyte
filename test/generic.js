import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {files} from './utils/common'

describe('generator-lionbyte:generic', function () {
  this.timeout(5000)

  describe('scaffolds a generic project with cli', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing generic',
        version: '0.0.0',
        projectType: 'generic',
        cli: true,
        command: 'heck'
      })
    })

    it('creates files', () => {
      assert.file([
        'src/cli.js',
        '.npmignore',
        ...files
      ])
    })
  })

  describe('scaffolds a generic project', () => {
    before(() => {
      return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        name: 'test',
        description: 'testing the generator-lionbyte',
        'version': '0.0.0',
        projectType: 'generic',
        cli: false
      })
    })

    it('creates files', () => {
      assert.file([
        '.npmignore',
        ...files
      ])
    })
  })
})
