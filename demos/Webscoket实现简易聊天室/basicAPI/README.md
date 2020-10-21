## 简介

基于ws库的基础WebSocket内容学习。



## 运行项目

* 在server目录下执行`npm i`，`node index.js`
* 在服务器环境下打开client目录下的`index.html`



## WebSocket基本概念

WebSocket是一种网络传输协议，可在单个TCP连接上进行全双工通信，位于OSI模型的应用层。

- 建立的是TCP连接，与HTTP协议兼容
- 双向通信、主动推送
- 无同源限制，协议标识符为`ws`（加密`wss`）



**应用场景**

- 聊天、消息、点赞
- 直播评论（弹幕）
- 游戏、协同编辑、基于位置的应用



**常用库**

- ws：实现原生协议，特点：通用、性能高，定制型强
- socket.io：向下兼容协议，特点：适配性强、性能一般



## WebSocket 连接

### 在服务端建立server

```js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8888 });

wss.on("connection", (ws) => {
  console.log("one client is connection");
});
```



### 在服务端建立client

```js
const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8888");

ws.on("open", () => {
  console.log("the client is connected to server");
});
```



### 在客户端建立client

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
  <script>
    const ws = new WebSocket("ws://localhost:8888");
  </script>
</html>
```



## WebSocket常用API

- ws.onmessage：监听client发过来的消息
- ws.send(data)：主动发送消息给client/server
- ws.onopen：client连接上server事件监听
- ws.onerror：监听错误事件
- ws.onclose：监听关闭事件
- ws.close()：关闭连接

