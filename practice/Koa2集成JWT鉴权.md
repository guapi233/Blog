# Koa2集成 JWT 鉴权

设计到的关键中间件：`koa-jwt`、`jsonwebtoken`



### 通过 koa-jwt 进行路由删选

```js
// app.js
// 1. 引入 koa-jwt
const JWT = require("koa-jwt");

// 2. 设置 jwt 所需的密钥，以及不需要鉴权的公开路由
const jwt = JWT({ secret: require("./config/index").JWT_SECRET }).unless({
  path: [/^\/public/, /^\/login/],
});

// 3. 安装
app.use(jwt);
```

**注意：如果使用 `koa-jwt` 的同时还使用了 `koa2-cors` 中间件，需要将 `koa2-cors` 中间件的安装放置在 `koa-jwt` 上方，否则会导致复杂请求的 `OPTIONS` 请求被鉴权干掉。**



### 统一处理 jwt 鉴权失败的路由返回

```js
// app.js
app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      throw err;
    }
  });
});
```



### 通过 jsonwebtoken 创建 token

```js
// 参数：payload、密钥、options
let token = jsonwebtoken.sign({ _id: "Mob" }, config.JWT_SECRET, {
  // 用于设置 token 的过期时间，1d代表一天，1h代表一小时，以此类推
  expiresIn: "1d",
});
```

在登录接口将`token`返回，下一次客户端只需携带`Authorization: bearer [token]`请求头即可正常访问接口。