import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'
import {files, timeout} from './utils/config'

describe('generator-lionbyte:generic', function () {
  this.timeout(timeout)

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
        ...files
      ])
    })

    it('does not create cli.js', () => {
      assert.noFile([
        'src/cli.js'
      ])
    })
  })
})
