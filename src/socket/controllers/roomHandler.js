const Room = require("../../models/Room");
const User = require("../../models/User");

const rooms = {};

const joinRoom = async (io, socket, payload) => {
  const { roomId } = payload;
  const room = await Room.findById(roomId);
  console.log(room);
  socket.join(roomId);

  io.to(roomId).emit("updateUsers", room);
};

const addRoomMember = async (io, socket, payload) => {
  const addMember = async (memberId) => {
    const member = await User.findById(memberId);
    const isMemberExist = room.members.includes(memberId);
    if (member && !isMemberExist) {
      room.members.push(memberId);
      member.rooms.push(room._id);
      await member.save();
    }
  };
  const { _id } = socket.data.user;
  const { members, roomId } = payload;
  let room = await Room.findById(roomId);
  if (!room) {
    room = await Room.create({ admin: _id });
  }

  await Promise.all(members.map((member) => addMember(member)));
  await room.save();
  socket.emit("success", room);
};
const roomHandler = (io, socket) => {
  socket.on("joinRoom", (payload) => joinRoom(io, socket, payload));
  socket.on("addRoomMember", (payload) => addRoomMember(io, socket, payload));
};

module.exports = roomHandler;
