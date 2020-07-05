const path = require('path')

const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: { plugins: [autoprefixer(), cssnano()], sourceMap: true }
          },
          { loader: 'less-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      meta: {},
      scriptLoading: 'defer',
      title: 'Hello',
      template: 'static/index.html',
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true
      }
    }),
    new webpack.ProgressPlugin()
  ]
}
