const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')
const {files, timeout} = require('./utils/config')

describe('generator-lionbyte:generic', function () {
  this.timeout(timeout)

  const projectFiles = [
    ...files,
    'tasks/transpile.js'
  ]

  describe('scaffolds a generic project with cli', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../src/app'))
        .withPrompts({
          name: 'test',
          description: 'testing generic',
          version: '0.0.0',
          projectType: 'generic',
          cli: true,
          command: 'heck'
        })
        .then(() => done())
    })

    it('creates files', (done) => {
      assert.file([...projectFiles, 'src/cli.js'])
      done()
    })
  })

  describe('scaffolds a generic project', () => {
    before(done => {
      helpers.run(path.join(__dirname, '../src/app'))
        .withPrompts({
          name: 'test',
          description: 'testing the generator-lionbyte',
          version: '0.0.0',
          projectType: 'generic',
          cli: false
        })
        .then(() => done())
    })

    it('creates files', (done) => {
      assert.file(projectFiles)
      done()
    })

    it('does not create cli.js', (done) => {
      assert.noFile(['src/cli.js'])
      done()
    })
  })
})
