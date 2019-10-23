const path = require('path')
const fs = require('fs')

// 读取目录内容
const dir = require('./dir')

// 读取文件内容
const file = require('./file')

// 获取静态资源内容
async function content(ctx, fullStaticPath) {

  // 请求资源的完绝对径
  let reqPath = path.join(fullStaticPath, ctx.url)

  // 判断请求路径是否为存在目录或者文件
  let exist = fs.existsSync(reqPath)

  // 返回请求内容， 默认为空
  let content = ''

  if (!exist) {
    content = '404'
  } else {
    // 判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath)

    if (stat.isDirectory()) {
      // 如果为目录，则读取目录内容
      content = dir(ctx.url, reqPath)

    } else {
      // 如果请求为文件，则读取文件内容
      content = file(reqPath)
    }
  }

  return content
}

module.exports = content
