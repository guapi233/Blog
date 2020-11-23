# Vue + Koa2 + Socket.io

**依赖库版本信息**

* vue：2.6.11

* koa：2.7.0

* socket.io：3.03

* socket.io-client：3.03



## Koa2集成

```js
const Koa = require('koa');
const app = new Koa();
const server = require('http').Server(app.callback());
const io = require('socket.io')(server);
const port = 8081;

server.listen(process.env.PORT || port, () => {
     console.log(`app run at : http://127.0.0.1:${port}`);
})

io.on('connection', socket => {
     console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
     socket.on('send', data => {
          console.log('客户端发送的内容：', data);
          socket.emit('getMsg', '我是返回的消息... ...');
     })

     setTimeout( () => {
         socket.emit('getMsg', '我是初始化3s后的返回消息... ...') 
     }, 3000)
})
```

如果是在不同源下进行`socket`连接，需要，在创建`io`实例时将配置项`cors`打开:

```js
io = io(server, { cors: true });
```



## Vue集成

如果想在组件内部使用`socket`实例 ，可以使用`vue-socket.io`，我是将`socket`实例绑定在`vuex`上，所以只需安装官网要求的`socket.io-client`即可。

```typescript
import config from "@/config";
import { io } from "socket.io-client";

const socket = io(config.baseUrl);

socket.on("connect", () => {
  console.log("???");
});

export default socket;
```

