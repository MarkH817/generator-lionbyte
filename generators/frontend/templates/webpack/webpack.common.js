const path = require('path')

const autoprefixer = require('autoprefixer')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].[chunkhash].js',
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
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[path][name].[contenthash].[ext]',
              context: 'src/images/'
            }
          }
        ]
      }
    ]
  },
  resolve: { alias: { src: path.resolve(__dirname, '../src') } },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[name].[chunkhash].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      meta: {},
      scriptLoading: 'defer',
      title: 'Hello',
      template: path.resolve(__dirname, './template.html'),
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true
      }
    }),
    new webpack.ProgressPlugin()
  ]
}
