const webpack = require('webpack')
const pkg = require('./package')

module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' :'/vue-bricks/',
  outputDir: 'vue-bricks',
  pages: {
    index: {
      entry: './src/main.js',
      template: 'index.html'
    },
    example: {
      entry: './src/example.js',
      template: 'index.html',
      fileName: 'exmaple/index.html'
    }
  },
  configureWebpack: {
    resolve: { symlinks: false },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(pkg.version)
      })
    ]
  }
}