// 引入绝对路径
const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
module.exports = webpackMerge(baseConfig,{
  // 在什么环境中执行
  target: 'node',
  // 打包时入口文件
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  // 出口文件
  output: {
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2'
  }
})
