## 简介

基于socket.io的简易聊天室



## 运行项目

```shell
npm i
npm start
```



## socket.io 常用API

* socket.emit(消息名, 消息)：发送**命名**消息，只能触发监听**同样消息名**的回调
* socket.send(消息)：发送**message**消息，只能触发监听**message消息名**的回调
* socket.broadcast.emit(消息名，消息)：广播**命名**消息
* socket.broadcast.send(消息)：广播**message**数据
* socket.on(消息名, 回调函数)：监听消息
* socket.join(房间名)：加入某个房间
* socket.leave(退出房间)：退出某个房间
* socket.to(房间名).emit/send()：向所处的房间广播消息
* io.of(命名空间)：新建一个命名空间，前端通过`new io(/命名空间)`访问



## 建立express服务

```js
const app = require("express")();
const http = require("http").createServer(app);
// 升级http服务为socket服务
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 监听client连接
io.on("connection", (socket) => {
  console.log("a socket is connected!");
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
```



## 客户端连接

* 如果客户端文件与服务器程序运行在同一域名下，可以通过一下方式引入相关文件：

  ```html
  <script src="/socket.io/socket.io.js"></script>
  <script>
    const socket = io();
  </script>
  ```

* 否则的话可以使用[CDN](http://staticfile.org/)来进行引用：

  ```html
  <script        src="https://cdn.staticfile.org/socket.io/2.3.0/socket.io.js"></script>
  <script>
    const socket = io();
  </script>
  ```



## WebSocket鉴权

* 协议本身在握手阶段不提供鉴权方案，浏览器端的WebSocket对象无法修改传输的请求头
* 浏览器侧可用方案：url传参，message主动消息，session/cookie
* Node测：直接使用ws传Headers