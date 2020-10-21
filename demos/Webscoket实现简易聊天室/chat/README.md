## 简介

基于socket.io的简易聊天室



## 运行项目

```shell
npm i
npm start
```



## 建立express服务

```js
const app = require("express")();
const http = require("http").createServer(app);
// 升级http服务为socket服务
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
```

