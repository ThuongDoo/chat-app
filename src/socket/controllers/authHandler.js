const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { createJWT } = require("../../utils/jwt");

const authHandler = (io, socket) => {
  const register = async (payload) => {
    const { name, password, phone } = payload;
    let user = await User.findOne({ phone });
    if (user) {
      return socket.emit("error", "Phone number exist");
    }
    user = new User({ name, phone, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    socket.emit("success", "success");
  };

  const login = async (payload) => {
    const { phone, password } = payload;
    const user = await User.findOne({ phone });
    if (!user) {
      return socket.emit("error", "Invalid phone number");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return socket.emit("error", "Incorrect password");
    }

    // test
    // user.friends = [];
    // user.friendRequests = [];
    // await user.save();
    // test
    const userToken = createJWT({ payload: user });
    socket.handshake.auth = { userToken };
    socket.data.user = { name: user.name, phone: user.phone, _id: user._id };
    socket.emit("success", user);
  };

  const logout = async () => {
    socket.handshake.auth = {};
    socket.disconnect();
  };

  socket.on("register", register);
  socket.on("login", login);
  socket.on("logout", logout);
};

module.exports = authHandler;
