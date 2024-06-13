import { config } from "dotenv";

config({
  path: ".env",
});

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const appName = process.env.APP_NAME || "";
const whiteListed = (process.env.WHITELISTED_ORIGINS || "").split(",");
const PORT = Number(process.env.PORT || 4000);

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: whiteListed,
  },
});

app.get("/ping", (req, res) => res.status(200).send("Hello from server"));

io.on("connection", (socket) => {
  console.log(`a user connected to ${appName}`);

  socket.emit("CLIENT_CONNECTED", {
    message: `HELLO you are connected to ${appName}`,
    id: socket.id,
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`server listening at PORT: ${PORT}`);
});
