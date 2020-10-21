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

  socket.on("chatEvent", (msg) => {
    console.log(msg);

    socket.emit("server say", `server say ${msg}, too`);
  });
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
