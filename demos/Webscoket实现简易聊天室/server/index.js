const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8888 });

wss.on("connection", (ws) => {
  console.log("one client is connection");
});
