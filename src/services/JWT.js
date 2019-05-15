const jwt = require("jsonwebtoken"),
  { tokens } = require("../config/infoConfig");

const JWT = {};

JWT.createToken = (user) => {
  const payload = user;
  return jwt.sign(payload, tokens.USER_KEY);
}

JWT.getPayload = (token) => {
  let token = token.split(" ")[1];
  return jwt.decode(token);
}

module.exports = JWT;
