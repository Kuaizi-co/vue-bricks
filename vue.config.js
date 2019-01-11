
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' :'/vue-bricks/',
  outputDir: 'vue-bricks',
  pages: {
    index: {
      entry: './src/main.js',
      template: 'index.html'
    }
  }
}