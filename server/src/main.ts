import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { env } from "./config";

const appName = env.APP_NAME;
const whiteListed = env.WHITELISTED_ORIGINS;
const PORT = env.PORT;

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
