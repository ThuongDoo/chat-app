require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const roomHandler = require("./socket/controllers/roomHandler");
const messageHandler = require("./socket/controllers/messageHandler");
const authHandler = require("./socket/controllers/authHandler");
const { authentication } = require("./middlewares/authentication");
const userHandler = require("./socket/controllers/userHandler");

const onConnection = (socket) => {
  socket.use((packet, next) => {
    if (packet[0] !== "login" && packet[0] != "register") {
      authentication(socket, next);
    } else {
      next();
    }
  });
  roomHandler(io, socket);
  messageHandler(io, socket);
  authHandler(io, socket);
  userHandler(io, socket);
  socket.on("disconnect", () => {
    console.log("disconnect");
  });
  socket.onAny((event, ...args) => {
    console.log("\n", event, args);
  });
};

io.on("connection", onConnection);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
      console.log("server is listening on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
