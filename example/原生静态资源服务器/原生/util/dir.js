// 遍历读取目录
const walk = require('./walk')

// 读取目录内容
function dir(url, reqPath) {
  // 遍历当前目录下的文件，子目录
  let contentList = walk(reqPath)

  let html = `<ul>`
  for (let [index, item] of contentList.entries()) {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a>`
  }
  html = `${html}</ul>`
  return html;
}

module.exports = dir;