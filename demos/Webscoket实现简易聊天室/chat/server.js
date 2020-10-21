const app = require("express")();
const http = require("http").createServer(app);
// 升级http服务为socket服务
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.clientsCount = 0;

// 监听client连接
io.on("connection", (socket) => {
  console.log("a socket is connected!");

  // 监听消息
  socket.on("chatEvent", (msg) => {
    socket.broadcast.send(msg);
  });

  // 监听用户进入聊天室
  socket.on("enterChat", (msg) => {
    if (!msg) return;

    socket.name = msg;
    io.clientsCount++;

    socket.emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${msg} 进入聊天室！`,
        count: io.clientsCount,
      })
    );

    socket.broadcast.emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${msg} 进入聊天室！`,
        count: io.clientsCount,
      })
    );
  });

  // 监听用户离开事件
  socket.on("disconnect", () => {
    if (!socket.name) return;

    io.clientsCount--;
    socket.broadcast.emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${socket.name} 离开了聊天室！`,
        count: io.clientsCount,
      })
    );
  });
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
