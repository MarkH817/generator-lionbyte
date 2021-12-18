const path = require('path')

const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const paths = require('./paths')

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    main: path.resolve(paths.src, './index.js')
  },
  output: {
    path: paths.dist,
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].[chunkhash].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(mj|t|j)sx?$/,
        exclude: [/node_modules/],
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.(css|less)$/,
        use: [
          MiniCSSExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                config: path.resolve(__dirname, './postcss.config.js')
              }
            }
          },
          { loader: 'less-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)$/i,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[ext]' }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: { filename: 'images/[path][name].[contenthash].[ext]' }
      }
    ]
  },
  resolve: {
    alias: { src: paths.src },
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: paths.public,
          globOptions: { dot: true }
        }
      ]
    }),
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
    })
  ]
}
