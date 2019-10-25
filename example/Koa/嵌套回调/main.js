const WebServer = require('./index')
const app = new WebServer()

app.use(ctx => {
  ctx.res.write('hello world 1 \n')
})

app.use(ctx => {
  ctx.res.write('hello world 2 \n')
})

app.use(ctx => {
  ctx.res.write('hello world 3 \n')
})

app.listen(3000, _ => {
  console.log(`app is running at port 3000`)
})