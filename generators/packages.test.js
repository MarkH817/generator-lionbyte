const { getPackages } = require('./packages')

describe('getPackages', () => {
  test('base node', () => {
    const result = getPackages({ projectType: 'node' })
    expect(result).toMatchSnapshot()
  })

  test('base node + git hooks', () => {
    const result = getPackages({ gitHooks: true, projectType: 'node' })
    expect(result).toMatchSnapshot()
  })

  test('base frontend', () => {
    const result = getPackages({
      projectType: 'frontend',
      react: false
    })
    expect(result).toMatchSnapshot()
  })

  test('base frontend + react', () => {
    const result = getPackages({
      projectType: 'frontend',
      react: true
    })
    expect(result).toMatchSnapshot()
  })
})
