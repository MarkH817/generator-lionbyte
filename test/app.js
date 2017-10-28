import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-lionbyte:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../src/app'))
      .withPrompts({
        someAnswer: true
      })
  })

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ])
  })
})
