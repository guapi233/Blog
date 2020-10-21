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

  // 监听消息
  socket.on("chatEvent", (msg) => {
    socket.broadcast.send(msg);
  });

  // 监听用户进入聊天室
  socket.on("enterChat", (msg) => {
    socket.broadcast.send(`服务器：用户 ${msg} 进入聊天室！`);
  });
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
