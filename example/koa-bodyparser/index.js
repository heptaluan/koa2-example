const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const body = require('./bodyparser');
const app = new Koa();

app.use(body());

app.use(async (ctx, next) => {
  if (ctx.url === '/') {
    // 当 GET 请求时候返回表单页面
    let html = fs.readFileSync(path.join(__dirname, './index.html'), 'binary');
    ctx.body = html;
  } else if (ctx.url === '/post' && ctx.method === 'POST') {
    // 当 POST 请求的时候，解析 POST 表单里的数据，并显示出来
    ctx.body = ctx.request.body;
  } else {
    ctx.body = '404';
  }

  await next();
});

app.listen(3000)