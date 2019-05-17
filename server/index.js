const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));
// } else {
//   app.use("/public", express.static("../client/public"));
// }

// app.use("/public", express.static("../client/public"));

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
http.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
