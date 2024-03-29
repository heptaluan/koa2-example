const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')

// 子路由
let home = new Router()
home.get('/', async (ctx) => {
  ctx.body = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
})

// 子路由二
let page = new Router()
page.get('/404', async (ctx) => {
  ctx.body = `404.page`
}).get('/helloworld', async (ctx) => {
  ctx.body = `helloworld page`
})

// 装载所有路由
let router = new Router()
router.use('/', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)

