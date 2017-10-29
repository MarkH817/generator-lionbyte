import merge from 'webpack-merge'
import webpack from 'webpack'
import common from './webpack.common'

const config = merge(common, {
  devtool: 'source-map',

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
})

export default config
