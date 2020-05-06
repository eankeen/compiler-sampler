import path from 'path'

import webpack from 'webpack'
import WebpackBar from 'webpackbar'

import { babelEntry, postcssEntry } from './modules'

const isDev = process.env.NODE_ENV === 'development'

export default {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  devtool: isDev ? 'eval-cheap-source-map' : 'source-map',
  context: path.join(__dirname),
  entry: {
    dll: [
      ...babelEntry,
      ...postcssEntry
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'vendor.js',
    library: 'vendor_lib_[name]_[hash]',
    libraryTarget: 'window'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib_[name]_[hash]',
      path: path.resolve(__dirname, 'dist/vendor-manifest.json'),
      format: isDev,
      entryOnly: true
    }),
    new WebpackBar()
  ],
  node: {
    fs: 'empty'
  }
}
