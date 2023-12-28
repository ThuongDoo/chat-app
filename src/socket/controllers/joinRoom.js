const joinRoom = (socket, io, data, rooms) => {
  const { roomId } = data;
  socket.join(roomId);
  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }
  rooms[roomId].push(socket.id);
  io.to(roomId).emit("updateUsers", rooms[roomId]);
};
module.exports = joinRoom;
