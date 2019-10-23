const fs = require('fs')

// 读取文件
function file(filePath) {
  let content = fs.readFileSync(filePath, 'binary')
  return content;
}

module.exports = file;