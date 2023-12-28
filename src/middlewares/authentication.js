const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils/jwt");
const authentication = (socket, next) => {
  const token = socket.handshake.auth.userToken;
  console.log("token", token);
  try {
    const { phone, name } = isTokenValid({ token });
  } catch (error) {
    socket.emit("error", "Invalid Credential");
    socket.disconnect();
  }
  next();
};

module.exports = { authentication };
