import { io } from "socket.io-client";

const url = "http://localhost:8000";
const num = 100;

for (let i = 0; i < num; i++) {
  const ws = io(url, {
    transports: ["websocket"],
  });
  ws.on("CLIENT_CONNECTED", (message) => {
    console.log(`message ${i + 1}`, message);
  });
}

setInterval(() => {
  console.log("running...");
}, 10_000);
