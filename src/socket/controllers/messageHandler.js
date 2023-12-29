const Message = require("../../models/Message");
const Room = require("../../models/Room");
const User = require("../../models/User");

const sendMessage = async (io, socket, payload) => {
  const { _id } = socket.data.user;
  const { roomId, message } = payload;
  const room = await Room.findById(roomId);
  if (!room) {
    return socket.emit("error", "RoomId is not exist");
  }
  const newMessage = await Message.create({ user: _id, content: message });
  room.messages.push(newMessage);
  await room.save();
  io.to(roomId).emit("newMessage", { message: newMessage });
};

const getRoomMessages = async (io, socket, payload) => {
  const { _id } = socket.data.user;
  const { roomId } = payload;
  const user = await User.findById(_id);
  const room = await Room.findById(roomId).populate({ path: "messages" });
  if (!room) {
    return socket.emit("error", "RoomId is not exist");
  }
  const isRoomExist = user.rooms.includes(roomId);
  if (!isRoomExist) {
    return socket.emit("error", "User is not a member of this room");
  }
  socket.emit("success", { messages: room.messages });
};

const messageHandler = (io, socket) => {
  socket.on("sendMessage", (payload) => sendMessage(io, socket, payload));
  socket.on("getRoomMessages", (payload) =>
    getRoomMessages(io, socket, payload)
  );
};

module.exports = messageHandler;
