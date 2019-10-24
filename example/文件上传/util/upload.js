const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')


// 获取上传文件的后缀名
function getSuffixName(fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

// 上传文件
function uploadFile(ctx, options) {
  let busboy = new Busboy({ headers: ctx.req.headers })

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = {
      success: false,
      formData: {},
    }

    // 解析请求文件事件
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)

      // 如果路径不存在，则创建路径
      !fs.existsSync(options.path) && fs.mkdirSync(options.path)
      let _uploadFilePath = path.join(options.path, fileName)
      let saveTo = path.join(_uploadFilePath)

      // 文件保存到制定路径
      file.pipe(fs.createWriteStream(saveTo))

      // 文件写入事件结束
      file.on('end', function () {
        result.success = true
        result.message = '文件上传成功'

        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析表单中其他字段信息
    busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function () {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function (err) {
      console.log('文件上出错')
      reject(result)
    })

    ctx.req.pipe(busboy)
  })

}

module.exports = {
  uploadFile
}