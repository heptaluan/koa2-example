const fs = require('fs')
const walkFile = require('./walkFile')

// 获取 SQL 目录下的文件目录数据
function getSqlMap() {
  let basePath = __dirname
  basePath = basePath.replace(/\\/g, '\/')

  let pathArr = basePath.split('\/')
  pathArr = pathArr.splice(0, pathArr.length - 1)
  basePath = pathArr.join('/') + '/sql/'

  let fileList = walkFile(basePath, 'sql')
  return fileList
}

module.exports = getSqlMap