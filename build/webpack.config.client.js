// 引入路径模块
const path = require('path')
const webpack = require('webpack')
// 合并文件
const webpackMerge = require('webpack-merge')
// 引入生成html的插件
const HTMLPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.js')
// 判断环境是否属于开发环境
// const isDev = process.env.NODE_ENV === 'development'
const isDev = process.env.NODE_ENV='development' 
// 后者对比合并前者
const config = webpackMerge(baseConfig, {
  // 打包时入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js'),
  },
  // devServer: {
  //   contentBase: './dist',
  //   open: true
  // },
  // 出口文件
  output: {
    // []里面可以放置变量  [hash]打包后给文件加一个hash值
    filename: '[name].[hash].js',
  },
  plugins: [
    // 生成html页面,挂载在
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})
// 如果是开发环境
if(isDev){
  // webpack 在开发环境下的配置
  config.entry = {
    // 开发环境下热更新代码
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../client/app.js'),
    ]
  }
  config.devServer = {
  // 访问地址 任何方式都可以访问
  host: 'localhost',
  // // 访问端口
  port: 8080,
  contentBase: path.join(__dirname,'../dist'),
  // 启动热更新
  hot: true,
  open: true,
  // 抛出异常
  overlay: {
    // 只显示错误信息
    errors: true
  },
  publicPath: '/public/',
  historyApiFallback: {
    index: '/public/index.html'
  },
  }
  // 热更新配置 
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

// 导出
module.exports = config