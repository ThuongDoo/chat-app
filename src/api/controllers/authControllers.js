const User = require("../../models/User");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const { attachCookiesToResponse } = require("../../utils/jwt");

const register = async (req, res) => {
  const { name, password, phone } = req.body;
  let user = await User.findOne({ phone });
  if (user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Phone number exist" });
  }
  user = new User({ name, phone, password });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  res.status(StatusCodes.OK);
};

const login = async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid phone number" });
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Incorrect password" });
  }
  attachCookiesToResponse({ res, user });
  req.user = { phone, user: user.name, password };
  res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
module.exports = { register, login, logout };
