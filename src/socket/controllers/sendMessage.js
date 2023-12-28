const sendMessage = (socket, io, data) => {
  const { roomId, message } = data;
  io.to(roomId).emit("newMessage", message);
};

module.exports = sendMessage;
