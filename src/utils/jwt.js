const jwt = require("jsonwebtoken");

const createUserToken = (user) => {
  return {
    _id: user._id,
    name: user.name,
    password: user.password,
    phone: user.phone,
  };
};

const createJWT = ({ payload }) => {
  const userToken = createUserToken(payload);
  const token = jwt.sign(userToken, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user }) => {
  const userToken = createUserToken(user);
  const token = createJWT({ payload: userToken });
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // expires: new Date(Date.now() + expiresIn * 1000),
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    signed: true,
  });
};

module.exports = { attachCookiesToResponse, isTokenValid, createJWT };
