const app = require("express")();
const http = require("http").createServer(app);
// 升级http服务为socket服务
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 总人数 & 不同房间中的人数
io.clientCount = 0;
io.roomClientCount = {};

// 监听client连接
io.on("connection", (socket) => {
  // 监听消息
  socket.on("chatEvent", (msg) => {
    socket.to(socket.room).send(msg);
  });

  // 监听用户进入聊天室
  socket.on("enterChat", (msg) => {
    try {
      var { name, room } = JSON.parse(msg);
    } catch (err) {
      return;
    }

    if (io.roomClientCount[room] && io.roomClientCount[room].includes(name)) {
      socket.emit("nameHasBeen", "1");

      return;
    } else {
      socket.emit("nameHasBeen", "");
    }

    // 初始化当前用户身上的信息 & 全局信息
    socket.name = name;
    socket.room = room;
    socket.join(room);
    io.clientCount++;
    io.roomClientCount[socket.room]
      ? io.roomClientCount[socket.room].push(socket.name)
      : (io.roomClientCount[socket.room] = [socket.name]);

    socket.emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${name} 进入聊天室！`,
        count: io.roomClientCount[socket.room].length,
      })
    );

    socket.to(socket.room).emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${name} 进入聊天室！`,
        count: io.roomClientCount[socket.room].length,
      })
    );
  });

  // 监听用户离开事件
  socket.on("disconnect", () => {
    if (!socket.name || !socket.room) return;

    // 人数减1
    io.clientsCount--;
    if (io.roomClientCount[socket.room]) {
      let index = io.roomClientCount[socket.room].indexOf(socket.name);
      index !== -1 && io.roomClientCount[socket.room].splice(index, 1);
    }

    // 广播消息 & 退出房间
    socket.to(socket.room).emit(
      "enterOrLeave",
      JSON.stringify({
        message: `系统：用户 ${socket.name} 离开了聊天室！`,
        count: io.roomClientCount[socket.room].length,
      })
    );
    socket.leave(socket.room);
  });
});

http.listen(9999, () => {
  console.log("the server is running at 9999...");
});
