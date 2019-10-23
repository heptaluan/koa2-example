const Koa = require('koa')
const app = new Koa()
const fs = require('fs')

function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`
    fs.readFile(viewUrl, 'binary', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

async function route(url) {
  let view = '404.html'
  switch (url) {
    case '/':
    case '/index':
      view = 'index.html'
      break;

    case '/user':
      view = 'user.html'
      break;

    case '/404':
      view = '404.html'
      break;

    default:
      break;
  }
  let html = render(view)
  return html
}

app.use(async (ctx) => {
  ctx.body = await route(ctx.url)
}).listen(3000)