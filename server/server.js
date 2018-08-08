// 基于node的web开发框架
const express = require('express')
// react-dom 下的服务端渲染模块
const ReactSSR = require('react-dom/server')
// Node.js内置的文件系统模块
const fs = require('fs')
const path = require('path')
// 使用express
const app = express()
const isDev = process.env.NODE_ENV === 'development'

if(!isDev){
  // 因为 server-entry 文件是 default 出去的 所以如果使用require获取,需要在后面加上default
  const serverEntry = require('../dist/server-entry').default
  // fs.readFileSync()同步读取文件 utf-8 文件格式
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
  // express.static(root, [options]) 加载静态资源 root=>静态资源文件所在根目录 [options]可选
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  // 请求的接口
  app.get('*', function (req, res) {
    // 使用react 服务端渲染
    const appString = ReactSSR.renderToString(serverEntry)
    // 发送的数据
    res.send(template.replace('<!-- app -->', appString))
  })
}else{
  const devStatic = require('./util/dev-static.js')
  devStatic(app)
}
// 开启端口
app.listen(333,function () {
  console.log('333')
})