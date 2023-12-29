const Room = require("../../models/Room");
const User = require("../../models/User");
const { createDualChat } = require("./roomHandler");

const sendFriendRequest = async (io, socket, payload) => {
  const { _id } = socket.data.user;
  const { friendId } = payload;
  try {
    const user = await User.findById(_id);
    const friend = await User.findById(friendId);
    if (!friend) {
      return socket.emit("error", "Friend is not exist");
    }
    const isFriendExist = user.friends.includes(friendId);
    if (isFriendExist) {
      return socket.emit("error", "Friend already exist");
    }
    const isFriendRequestExist = user.friendRequests.includes(friendId);
    if (isFriendRequestExist) {
      return socket.emit("error", "Friend request already exist");
    }

    user.friendRequests.push(friendId);
    friend.friendRequests.push(_id);
    await friend.save();
    await user.save();
    socket.broadcast.emit("friendRequest", { friendId, _id });
  } catch (error) {
    console.log(error);
    socket.emit("error", error);
  }
};

const addFriend = async (io, socket, payload) => {
  const add = async (userId, friendId) => {
    try {
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!friend) {
        throw new Error(`userId: ${friendId} is not exist`);
      }
      const isFriendExist = user.friends.includes(friendId);
      if (isFriendExist) {
        throw new Error(`friendId: ${friendId} already exist`);
      }
      const friendIndex = user.friendRequests.indexOf(friendId);
      if (friendIndex !== -1) {
        user.friendRequests.splice(friendIndex, 1);
        user.friends.push(friendId);
        await user.save();
        return true;
      } else {
        throw new Error("Friend request is not exist");
      }
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };
  const { _id } = socket.data.user;
  const { friendId } = payload;
  const addUser = await add(_id, friendId);
  const addFr = await add(friendId, _id);
  if (addUser !== true) {
    return socket.emit("error", addUser.message);
  } else if (addFr !== true) {
    return socket.emit("error", addFr.message);
  } else {
    await createDualChat(io, socket, (payload = { memberId: friendId }));

    socket.emit("success", "success");
  }
};

const showMe = async (io, socket) => {
  const { _id } = socket.data.user;
  const user = await User.findById(_id);
  socket.emit("success", user);
};

const userHandler = (io, socket) => {
  socket.on("sendFriendRequest", (payload) =>
    sendFriendRequest(io, socket, payload)
  );
  socket.on("addFriend", (payload) => addFriend(io, socket, payload));
  socket.on("showMe", (payload) => showMe(io, socket));
};

module.exports = userHandler;
