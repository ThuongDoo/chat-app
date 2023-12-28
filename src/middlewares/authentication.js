const { StatusCodes } = require("http-status-codes");
const { isTokenValid } = require("../utils/jwt");
const authentication = (req, res, next) => {
  const token = req.signedCookies.token;
  console.log("token", req);
  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: "Unauthenticated" });
  }
  const { phone, name, password } = isTokenValid({ token });
  req.user = { phone, name, password };
  next();
};

module.exports = { authentication };
