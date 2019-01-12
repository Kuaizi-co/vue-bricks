const webpack = require('webpack')
const package = require('./package')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' :'/vue-bricks/',
  outputDir: 'vue-bricks',
  pages: {
    index: {
      entry: './src/main.js',
      template: 'index.html'
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(package.version)
      })
    ]
  }
}