// 引入绝对路径
const path = require('path')
module.exports = {
  // 在什么环境中执行
  target: 'node',
  // 打包时入口文件
  entry: {
    app: path.join(__dirname, '../client/server-entry.js'),
  },
  // 出口文件
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    // 区分静态资源
    publicPath: 'public',
    libraryTarget: 'commonjs2',
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
  }
}