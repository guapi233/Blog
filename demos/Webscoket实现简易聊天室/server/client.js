/**
 * 运行在server上的 WebSocket Client
 */

const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8888");

ws.on("open", () => {
  console.log("the client is connected to server");

  ws.send("hello server");
});

ws.on("message", (msg) => {
  console.log(msg);
});
