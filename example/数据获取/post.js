const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.body = `
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    ctx.body = await parsePostData(ctx)
  } else {
    ctx.body = `404`
  }
})


function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = '';
      ctx.req.on('data', (data) => {
        postData += data
      })
      ctx.req.on('end', function() {
        resolve(parseQueryStr(postData))
      })
    } catch (err) {
      reject(err)
    }
  })
}

function parseQueryStr(queryStr) {
  let queryData = {}
  let queryStrList = queryStr.split('&')
  for (let [index, queryStr] of queryStrList.entries()) {
    let itemList = queryStr.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  return queryData
}

app.listen(3000)