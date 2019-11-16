/**
 * @param {object} options
 * @returns {{ devDependencies: string[], dependencies: string[] }}
 */
exports.getPackages = function getPackages (options) {
  /** @type {Array<string>} */
  const devDependencies = [
    '@lionbyte/eslint-config',
    '@types/jest',
    '@types/node',
    'eslint',
    'jest',
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
      '@babel/plugin-syntax-dynamic-import',
      '@babel/preset-env',
      'autoprefixer',
      'babel-jest',
      'babel-loader',
      'babel-plugin-dynamic-import-node',
      'clean-webpack-plugin',
      'css-loader',
      'cssnano',
      'less',
      'less-loader',
      'postcss-loader',
      'style-loader',
      'mini-css-extract-plugin',
      'html-webpack-plugin',
      'webpack',
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
