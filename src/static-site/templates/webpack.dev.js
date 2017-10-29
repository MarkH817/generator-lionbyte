import merge from 'webpack-merge'
// import webpack from 'webpack'
import common from './webpack.common'

const config = merge(common, {
  devtool: 'inline-source-map'
})

export default config
