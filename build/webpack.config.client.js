// 引入路径模块
const path = require('path')
const webpack = require('webpack')
// 引入生成html的插件
const HTMLPlugin = require('html-webpack-plugin')
// 判断环境是否属于开发环境
// const isDev = process.env.NODE_ENV === 'development'
const isDev = process.env.NODE_ENV='development' 

const config = {
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
    // __dirname表示当前运行环境绝对路径
    path: path.join(__dirname,'../dist'),
    // 区分静态资源 后面必须加斜杆/
    publicPath: '/public/',
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
        // 排除  不需要二次编译
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