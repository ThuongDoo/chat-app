const { Server } = require("socket.io");
const { joinRoom, sendMessage } = require("./controllers");
const { authentication } = require("../middlewares/authentication");

const onConnection = (socket) => {
  console.log("User socket:", socket.id, "connected");

  socket.on("joinRoom", (data) => joinRoom(socket, io, data, rooms));
  socket.on("sendMessage", (data) => sendMessage(socket, io, data));
};

module.exports = onConnection;
