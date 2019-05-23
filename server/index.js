const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.send("ok");
});

io.on("connection", socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("chat message", ({ nickname, message }) => {
    io.emit("chat message", { nickname, message });
  });

  socket.on("code", ({ nickname, code }) => {
    io.emit("code", { nickname, code });
  });
  socket.on("disconnect", () => console.log(`User disconnected`));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
