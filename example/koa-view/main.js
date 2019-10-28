const Koa = require('koa');
const path = require('path');
const view = require('./index');

// 初始化一个 Koa 实例
const app = new Koa()

// 将需要的属性或者方法挂载在 app.context 上
view(app, {
  baseDir: path.join(__dirname, 'views')
})

app.use(async ctx => {
  await ctx.view(`${ctx.path}.html`, {
    title: 'index page'
  })
})

app.use(async ctx => {
  await ctx.view(`${ctx.path}.html`, {
    title: 'index page'
  })
})

app.listen(3000)