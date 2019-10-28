const path = require('path');
const Koa = require('koa');
const statics = require('./index');

const app = new Koa();

const root = path.join(__dirname, './public')
app.use(statics({ root }))

app.listen(3000)