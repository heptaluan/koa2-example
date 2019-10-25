const logger = async (ctx, next) => {
  let res = ctx.res;

  // 拦截操作请求 request
  console.log(`<== 请求的方式和地址为 ${ctx.method} ${ctx.url}`);

  await next();

  // 拦截操作响应 request
  res.on('finish', _ => {
    console.log(`==> 响应的方式和地址为 ${ctx.method} ${ctx.url}`);

  })
}

module.exports = logger;