const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyParser')

app.use(bodyParser())

app.use(async (ctx) => {

  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    // 这里需要注意，ctx.request 是 context 经过封装的请求对象
    // ctx.req 是 context 提供的 Node.js 的原生 http 请求对象
    // 注意区分两者的区别
    ctx.body = ctx.request.body
  } else {
    ctx.body = '404'
  }
})

app.listen(3000)