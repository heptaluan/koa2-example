const getSqlContentMap = require('./util/getSqlContentMap');
const { query } = require('./util/db');


// 打印脚本执行日志
const eventLog = function (err, sqlFile, index) {
  if (err) {
    console.log(`[ERROR] SQL 脚本文件: ${sqlFile} 第 ${index + 1} 条脚本 执行失败！`)
  } else {
    console.log(`[SUCCESS] SQL 脚本文件: ${sqlFile} 第 ${index + 1} 条脚本 执行成功!`)
  }
}

// 获取所有 SQL 脚本内容
let sqlContentMap = getSqlContentMap()

// 执行建表 SQL 脚本
const createAllTables = async _ => {
  for (let key in sqlContentMap) {
    let sqlShell = sqlContentMap[key]
    let sqlShellList = sqlShell.split(';')

    for (let [i, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        let result = await query(shell)
        if (result.serverStatus * 1 === 2) {
          eventLog(null, key, i)
        } else {
          eventLog(true, key, i)
        }
      }
    }
  }
  console.log('SQL 脚本执行结束')
  console.log('请按 Ctrl + C 键退出')
}

createAllTables()