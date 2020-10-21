## 简介

基于socket.io的简易聊天室



## 运行项目

```shell
npm i
npm start
```



## socket.io 常用API

* socket.emit(消息名, 数据)：发送**命名**消息，只能触发监听**同样消息名**的回调
* socket.send(数据)：发送**message**消息，只能触发监听**message消息名**的回调
* socket.on(消息名, 回调函数)：监听消息
* socket.broadcast.emit(消息名，数据)：广播命名数据



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

  