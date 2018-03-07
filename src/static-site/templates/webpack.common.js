const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    index: path.join(__dirname, './src/index.js')
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')(), require('cssnano')()],
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: { sourceMap: true }
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('main.css'),
    new HtmlWebpackPlugin({
      title: 'Hello',
      template: 'pages/index.html'
    })
  ]
}
