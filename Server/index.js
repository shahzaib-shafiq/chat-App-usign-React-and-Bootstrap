const httpServer = require("http").createServer();
const { connectToDatabase } = require("./config/db");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:8080",
  },
});

const User = require("./config/userModel");

const dbConnect = async () => {
  try {
    await connectToDatabase();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Failed to connect to database:", error);
  }
};

dbConnect();

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on("connection", async(socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
const user=User.create({
  user_name: socket.username,
  Socket_id: socket.id,
})
  // notify existing users
  console.log('-===========================',socket.username,socket.id)


  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,

  });

  // forward the private message to the right recipient
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.id,
    });
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
