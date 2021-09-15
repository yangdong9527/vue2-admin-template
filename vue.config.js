const defaultSetting = require('./src/setting')
const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack (config) {
    config.plugin('html')
      .tap(args => {
        args[0].title = defaultSetting.title
        return args
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('./src/assets/styles/variable.scss'),
        resolve('./src/assets/styles/mixin.scss')
      ]
    }
  },
  devServer: {
    open: true,
    port: 9527,
    hot: true
  }
}
