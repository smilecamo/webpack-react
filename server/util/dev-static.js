const axios = require('axios')
const webpack = require('webpack')
const path = require('path')
// 代理
const proxy = require('http-proxy-middleware')
// 从内存中读取
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const serverConfig = require('../../build/webpack.config.server.js')
// 获取服务端的
const getTemplate = () => {
  return new Promise((resolve,reject) => {
    axios.get('http://localhost:8080/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}
// 给module 构造函数上添加东西
const Module = module.constructor
const mfs = new MemoryFs()
// 注册一个变量 供下面的模板使用
let serverBundle
// 监测是否有变化
const serverCompiler = webpack(serverConfig)
// 利用mfs读取
serverCompiler.outputFileSystem = mfs
// 监听变化
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err
  // 转化 webpack 输出信息 state
  stats = stats.toJson()
  // 循环输出错误
  stats.errors.forEach(err=>console.error(err))
  // 循环输出warn
  stats.warnings.forEach(warn => console.warn(warn))

  // 获取bundle信息 这里写的是详细地址
  const bundlePath = path.join(
    // 路径
    serverConfig.output.path,
    // 文件名字
    serverConfig.output.filename
  )
  // 同步读取数据,指定编码格式
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  // 新建module函数
  const m = new Module()
  // 使用 module 解析 生成新的模块 必须指定文件名
  m._compile(bundle,'server-entry.js')
  // 赋值    因为是server-entry.js 文件是export的
  serverBundle = m.exports.default
})

module.exports = function(app){
  app.get('*', function(req,res){
    app.use('/public',proxy({
      target: 'http://localhost:8080'
    }))
    getTemplate().then(template => {
      // 服务端渲染
      const content = ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->', content))
    })
  })
}
