const Koa = require('koa')
const app = new Koa()
const log = require('./async-context')

app.use(log())

app.use(async (ctx) => {
  ctx.body = `hello world`
})

app.listen(3000)