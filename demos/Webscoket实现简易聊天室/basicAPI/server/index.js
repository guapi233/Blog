/**
 * 运行在server上的 WebSocket Server
 */

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8888 });

wss.on("connection", (ws) => {
  console.log("one client is connection");

  ws.on("message", (msg) => {
    wss.clients.forEach((client) => {
      // 不向自己推送
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send("server：" + msg);
      }
    });
  });
});
