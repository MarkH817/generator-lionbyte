const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[name].[chunkhash].js',
    publicPath: '/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
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
    alias: { src: path.resolve(__dirname, '../src') },
    extensions: ['.wasm', '.mjs', '.js', '.ts', '.tsx', '.json']
  },
  plugins: [
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
