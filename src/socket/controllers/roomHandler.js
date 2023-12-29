const Room = require("../../models/Room");
const User = require("../../models/User");

const joinRoom = async (io, socket, payload) => {
  const { roomId } = payload;
  const room = await Room.findById(roomId);
  if (!room) {
    socket.emit("error", "RoomId is not exist");
  }
  socket.join(roomId);

  io.to(roomId).emit("userJoin", room);
};

const createRoomChat = async (io, socket, payload) => {
  const createMemberRoom = async (memberId) => {
    const member = await User.findById(memberId);
    if (member) {
      member.rooms.push(room._id);
      await member.save();
    }
  };
  const { _id } = socket.data.user;
  const { members } = payload;
  const user = await User.findById(_id);
  const room = await Room.create({ admin: _id, members, type: "group" });
  await Promise.all(members.map((member) => createMemberRoom(member)));
  user.rooms.push(room._id);
  await user.save();
  room.members.push(_id);
  // set member unique
  room.members = [...new Set(room.members.map(String))];
  await room.save();
  socket.emit("success", "Created room");
};

const addRoomMember = async (io, socket, payload) => {
  const addEachMember = async (memberId) => {
    const member = await User.findById(memberId);
    if (member) {
      room.members.push(memberId);
      member.rooms.push(room._id);
      await member.save();
    }
  };
  const { members, roomId } = payload;
  const room = await Room.findById(roomId);
  if (!room) {
    return socket.emit("error", "RoomId is not exist");
  }
  if (room.type === "dual") {
    return socket.emit("error", "Can't update dual chat ");
  }
  await Promise.all(members.map((member) => addEachMember(member)));

  // set member unique
  room.members = [...new Set(room.members.map(String))];
  await room.save();
  socket.emit("success", "Add members success");
};

const deleteRoomMember = async (io, socket, payload) => {
  const deleteMemberRoom = async (memberId) => {
    const member = await User.findById(memberId);
    if (member) {
      const roomIndex = member.rooms.indexOf(room._id);
      if (roomIndex !== -1) {
        member.rooms.splice(roomIndex, 1);
        await member.save();
      }
    }
  };
  const { members, roomId } = payload;
  const room = await Room.findById(roomId);
  if (!room) {
    return socket.emit("error", "RoomId is not exist");
  }
  if (room.type === "dual") {
    return socket.emit("error", "Can't update dual chat ");
  }
  await Promise.all(members.map((member) => deleteMemberRoom(member)));
  room.members = room.members.filter(
    (member) => !members.includes(String(member))
  );

  // set member unique
  room.members = [...new Set(room.members.map(String))];
  await room.save();
  socket.emit("success", "Delete members success");
};

const createDualChat = async (io, socket, payload) => {
  const { _id } = socket.data.user;
  const { memberId } = payload;
  const user = await User.findById(_id);
  const member = await User.findById(memberId);
  if (!member) {
    return socket.emit("error", "MemberId is not exist");
  }
  const room = await Room.create({ members: [_id, memberId] });
  user.rooms.push(room._id);
  member.rooms.push(room._id);
  await user.save();
  await member.save();
  socket.emit("success", "Created room");
};

const getUserRooms = async (io, socket, payload) => {
  const { _id } = socket.data.user;
  const user = await User.findById(_id).populate({ path: "rooms" });
  socket.emit("success", { rooms: user.rooms });
};

const roomHandler = (io, socket) => {
  socket.on("joinRoom", (payload) => joinRoom(io, socket, payload));
  socket.on("addRoomMember", (payload) => addRoomMember(io, socket, payload));
  socket.on("deleteRoomMember", (payload) =>
    deleteRoomMember(io, socket, payload)
  );
  socket.on("createRoomChat", (payload) => createRoomChat(io, socket, payload));
  socket.on("createDualChat", (payload) => createDualChat(io, socket, payload));
  socket.on("getUserRooms", (payload) => getUserRooms(io, socket, payload));
};

module.exports = { roomHandler, createDualChat };
