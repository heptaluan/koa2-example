const Koa = require('koa')
const path = require('path')
const app = new Koa()

const { uploadFile } = require('./util/upload')

app.use(async (ctx) => {

  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.body = `
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
  } else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
    // 上传文件请求处理
    let result = { success: false }

    // 上传文件事件
    result = await uploadFile(ctx, {
      // 上传路径（默认当前路径下的 upload-files 文件夹）
      path: path.join(__dirname, 'upload-files')
    })

    ctx.body = result
  } else {
    ctx.body = '404'
  }
})

app.listen(3000)