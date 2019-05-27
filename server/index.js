const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const path = require("path");

app.use(express.static(path.join(__dirname, "client/build")));

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
