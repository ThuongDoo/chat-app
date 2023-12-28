const rooms = {};

const roomHandler = (io, socket) => {
  const joinRoom = (payload) => {
    const { roomId } = payload;
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push(socket.id);
    io.to(roomId).emit("updateUsers", rooms[roomId]);
  };

  socket.on("joinRoom", joinRoom);
};

module.exports = roomHandler;
