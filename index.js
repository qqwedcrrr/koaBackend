const Koa = require('koa');
const apicache = require("apicache");
const Router = require('koa-router')
const app = new Koa();
let cache = apicache.middleware;

app.use(async ctx => {
  ctx.body = 'Hello World2';
});

// 跨域设置

app.use(async (ctx,next) =>{
	if(ctx.path !== "/" && !ctx.path.includes(".")){
		ctx.header("Access-Control-Allow-Credentials", true);
    // 这里获取 origin 请求头 而不是用 *
	    ctx.header("Access-Control-Allow-Origin", ctx.headers["origin"] || "*");
	    ctx.header("Access-Control-Allow-Headers", "X-Requested-With");
	    ctx.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	    ctx.header("Content-Type", "application/json;charset=utf-8");
	}
	else
		await next()
})

const onlyStatus200 = ctx => ctx.statusCode === 200;

app.use(cache("1 minutes", onlyStatus200));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server running @ http://localhost:${port}`);
});