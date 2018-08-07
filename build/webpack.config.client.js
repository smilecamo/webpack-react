// 引入路径模块
const path = require('path')
// 引入生成html的插件
const HTMLPlugin = require('html-webpack-plugin')
module.exports = {
  // 打包时入口文件
  entry: {
    app: path.join(__dirname, '../client/app.js'),
  },
  // 出口文件
  output: {
    // []里面可以放置变量  [hash]打包后给文件加一个hash值
    filename: '[name].[hash].js',
    // __dirname表示当前运行环境绝对路径
    path: path.join(__dirname,'../dist'),
    // 区分静态资源
    publicPath: 'public',
  },
  module: {
    rules: [
      // 编译jsx 
      // 需要在根目录下创建   .babelrc 在里面配置规则 需要把这些都npm 下来
      {
        test: /.jsx$/,
        // 如果使用 babel-loader 需要npm babel-core 和 babel-loader
        loader: "babel-loader"
      },
      // 编译js
      {
        test: /.js$/,
        loader: "babel-loader",
        // 排除不需要二次编译
        exclude: [
          path.join(__dirname, '../node_modules')
        ]
      }
    ]
  },
  plugins: [
    // 生成html页面,挂载在
    new HTMLPlugin({
      template: path.join(__dirname, '../client/template.html')
    })
  ]
}