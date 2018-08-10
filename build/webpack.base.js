const path = require('path')
module.exports = {
    output: {
      // __dirname表示当前运行环境绝对路径
      path: path.join(__dirname,'../dist'),
      // 区分静态资源 后面必须加斜杆/
      publicPath: '/public/',
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [{
          // 代码检查工具
          enforce: 'pre', //编译之前检查
          test: /\.(jsx|js)$/,
          loader: 'eslint-loader',
          // 除了
          exclude: [
            path.resolve(__dirname, '../node_modules')
          ]
        },
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
    }
}