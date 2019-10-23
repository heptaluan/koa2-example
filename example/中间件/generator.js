const Koa = require('koa')
const app = new Koa()
const convert = require('koa-convert')
const log = require('./async-context')

app.use(convert(log()))

app.use(async (ctx) => {
  ctx.body = `hello world`
})

app.listen(3000)

