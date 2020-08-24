/**
 * @param {object} options
 * @param {boolean} [options.gitHooks]
 * @param {string} options.projectType
 * @param {boolean} [options.react]
 */
exports.getPackages = function getPackages (options) {
  /** @type {Array<string>} */
  const devDependencies = [
    '@lionbyte/eslint-config',
    '@types/jest',
    '@types/node',
    'eslint',
    'jest',
    'jest-runner-eslint',
    'prettier',
    'typescript'
  ]
  /** @type {Array<string>} */
  const dependencies = []

  if (options.gitHooks) {
    devDependencies.push('husky', 'lint-staged')
  }

  if (options.projectType === 'frontend') {
    devDependencies.push(
      '@babel/core',
      '@babel/preset-env',
      '@types/webpack',
      '@types/webpack-bundle-analyzer',
      '@types/webpack-dev-server',
      '@types/webpack-merge',
      'autoprefixer',
      'babel-jest',
      'babel-loader',
      'clean-webpack-plugin',
      'css-loader',
      'cssnano',
      'file-loader',
      'less',
      'less-loader',
      'postcss-loader',
      'style-loader',
      'mini-css-extract-plugin',
      'html-webpack-plugin',
      'webpack',
      'webpack-bundle-analyzer',
      'webpack-cli',
      'webpack-dev-server',
      'webpack-merge'
    )
    dependencies.push('core-js@3', 'regenerator-runtime')
  }

  if (options.react) {
    devDependencies.push(
      '@babel/preset-react',
      '@types/react',
      '@types/react-dom'
    )
    dependencies.push('react', 'react-dom')
  }

  devDependencies.sort()
  dependencies.sort()

  return { devDependencies, dependencies }
}
