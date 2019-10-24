const Koa = require('koa')
const views = require('koa-views')
const path = require('path')

const app = new Koa()

// 加载模板
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

app.use(async (ctx) => {
  let title = 'hello world'
  await ctx.render('index', {
    title: title
  })
})

app.listen(3000)