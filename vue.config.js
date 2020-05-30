const webpack = require('webpack')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')

const vendorManifest = require('./dll/dist/vendor.manifest.json')

module.exports = {
  configureWebpack: {
    plugins: [
      // new HtmlWebpackTagsPlugin({
      //   tags: [
      //     'dll/dist/vendor.js'
      //   ]
      // }),
      new MonacoWebpackPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'json']
      }),
      new webpack.DllReferencePlugin({
        manifest: vendorManifest,
        sourceType: 'window'
      })
    ]
  },
  chainWebpack: config => {
    // config.module.rule('eslint')
    //   .exclude.push(/vendor/)
    config.entry('app')
      .clear()
    config.entry('app')
      // .add('./dll/dist/vendor.bundle.js')
      .add('./src/main.js')
  }
}
