const Koa = require('koa')
const logger = require('./log')
const app = new Koa()

app.use(logger)

app.use(async (ctx, next) => {
  ctx.body = `hello world`
})

app.listen(3000)