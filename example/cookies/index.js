const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/index') {
    ctx.cookies.set('cid', 'hello world', {
      domain: 'localhost',                // cookie 所在的域名
      path: '/index',                     // cookie 所在的路径
      maxAgeL: 10 * 60 * 1000,            // cookie 有效时长
      expires: new Date('2020-10-20'),    // cookie 失效时间
      httpOnly: false,                    // 是否只用于 http 请求中获取
      overwrite: false                    // 是否允许重写
    })
  
    ctx.body = `cookie is ok`
  } else {
    ctx.body = `hello world`
  }
})

app.listen(3000)