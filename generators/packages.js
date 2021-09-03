/**
 * @param {object} options
 * @param {boolean} [options.gitHooks]
 * @param {string} options.projectType
 * @param {boolean} [options.react]
 */
exports.getPackages = function getPackages (options) {
  /** @type {Array<string>} */
  const devDependencies = [
    '@lionbyte/eslint-config@latest',
    '@types/jest@27',
    '@types/node@latest',
    'eslint@7',
    'jest@27',
    'jest-runner-eslint@0.10',
    'prettier@2',
    'typescript@latest'
  ]
  /** @type {Array<string>} */
  const dependencies = []

  if (options.gitHooks) {
    devDependencies.push('husky@4', 'lint-staged@latest')
  }

  if (options.projectType === 'frontend') {
    devDependencies.push(
      '@babel/core@7',
      '@babel/preset-env@7',
      '@babel/preset-typescript@7',
      '@types/webpack@5',
      '@types/webpack-bundle-analyzer@4',
      'autoprefixer@10',
      'babel-jest@27',
      'babel-loader@latest',
      'css-loader@6',
      'cssnano@5',
      'less@4',
      'less-loader@10',
      'postcss-loader@6',
      'mini-css-extract-plugin@2',
      'html-webpack-plugin@5',
      'webpack@5',
      'webpack-bundle-analyzer@4',
      'webpack-cli@4',
      'webpack-dev-server@4',
      'webpack-merge@5'
    )
    dependencies.push('core-js@3', 'regenerator-runtime@latest')
  }

  if (options.react) {
    devDependencies.push(
      '@babel/preset-react@latest',
      '@types/react@latest',
      '@types/react-dom@latest'
    )
    dependencies.push('react@latest', 'react-dom@latest')
  }

  devDependencies.sort()
  dependencies.sort()

  return { devDependencies, dependencies }
}
