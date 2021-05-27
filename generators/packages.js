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
    '@types/jest@26',
    '@types/node@latest',
    'eslint@7',
    'jest@26',
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
      '@types/webpack@4',
      '@types/webpack-bundle-analyzer@3',
      '@types/webpack-dev-server@3',
      '@types/webpack-merge@4',
      'autoprefixer@9',
      'babel-jest@26',
      'babel-loader@latest',
      'clean-webpack-plugin@3',
      'css-loader@3',
      'cssnano@4',
      'file-loader@6',
      'less@3',
      'less-loader@6',
      'postcss-loader@3',
      'style-loader@1',
      'mini-css-extract-plugin@latest',
      'html-webpack-plugin@4',
      'webpack@4',
      'webpack-bundle-analyzer@3',
      'webpack-cli@3',
      'webpack-dev-server@3',
      'webpack-merge@4'
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
