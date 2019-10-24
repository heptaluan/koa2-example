const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')

const app = new Koa()

// 配置存储 session 信息的 mysql
let store = new MysqlSession({
  user: 'root',
  password: '',
  database: 'test',
  host: '127.0.0.1',
})

// 存放 sessionId 的 cookie 配置
let cookie = {
  maxAge: '',     // cookie 有效时长
  expires: '',    // cookie 失效时间
  path: '',       // cookie 所在的路径
  domain: '',     // cookie 所在的域名
  httpOnly: '',   // 是否只用于 http 请求中获取
  overwrite: '',  // 是否允许重写
  secure: '',
  sameSite: '',
  signed: '',
}

// 使用 session 中间件
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

app.use(async (ctx) => {

  // 设置 session
  if (ctx.url === '/set') {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if (ctx.url === '/') {

    // 读取 session 信息
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  }

})

app.listen(3000)