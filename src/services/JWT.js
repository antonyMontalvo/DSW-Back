const jwt = require("jsonwebtoken"),
  { tokens } = require("../config/infoConfig");

const JWT = {};

JWT.createToken = (user) => {
  const payload = user;
  return jwt.sign(payload, tokens.USER_KEY);
}

JWT.getPayload = (bearerToken) => {
  let token = bearerToken.split(" ")[1];
  return jwt.decode(token);
}

module.exports = JWT;
