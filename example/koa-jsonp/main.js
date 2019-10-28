const Koa = require('koa');
const jsonp = require('./index');
const app = new Koa();

jsonp(app, {})

app.use(async ctx => {
  await ctx.jsonp({
    data: 'this is jsonp test',
    success: true
  })
})

app.listen(3000)