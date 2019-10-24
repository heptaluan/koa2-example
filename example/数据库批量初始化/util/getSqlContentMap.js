// 获取所有 SQL 脚本内容
const fs = require('fs')
const getSqlMap = require('./getSqlMap')

let sqlContentMap = {}

// 读取 SQL 文件内容
function getSqlContent(fileName, path) {
  let content = fs.readFileSync(path, 'binary')
  sqlContentMap[fileName] = content
}

function getSqlContentMap() {
  let sqlMap = getSqlMap()
  for (let key in sqlMap) {
    getSqlContent(key, sqlMap[key])
  }

  return sqlContentMap
}

module.exports = getSqlContentMap