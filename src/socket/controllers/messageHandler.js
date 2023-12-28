const messageHandler = (io, socket) => {
  const sendMessage = (payload) => {
    const { roomId, message } = payload;
    const { phone } = socket.data.user;
    io.to(roomId).emit("newMessage", { phone, message });
  };
  socket.on("sendMessage", sendMessage);
};

module.exports = messageHandler;
