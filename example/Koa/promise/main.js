const SimpleKoa = require('./index');

const app = new SimpleKoa();

app.use(async ctx => {
  ctx.body = '<p>SimpleKoa</p>';
});

app.listen(3000, () => {
  console.log(`app is running at port 3000`);
});