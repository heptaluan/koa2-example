const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  let url = ctx.url
  let query = ctx.query
  let queryString = ctx.querystring

  ctx.body = {
    url,
    query,
    queryString
  }
})

app.listen(3000)

// 譬如访问 http://localhost:3000/?id=2&name=zhangsan，结果如下

// {
//   "url": "/?id=2&name=zhangsan",
//     "query": {
//       "id": "2",
//       "name": "zhangsan"
//     },
//   "queryString": "id=2&name=zhangsan"
// }