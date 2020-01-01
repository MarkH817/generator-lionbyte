const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.join(__dirname, './src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    chunkFilename: '[id].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          MiniCSSExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer(), cssnano()],
              sourceMap: true
            }
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
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
