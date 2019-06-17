const jwt = require("jsonwebtoken");

const JWT = {};

JWT.createToken = (user) => {
  const payload = user;
  return jwt.sign(payload, process.env.USER_KEY);
}

JWT.getPayload = (bearerToken) => {
  let token = bearerToken.split(" ")[1];
  return jwt.decode(token);
}

module.exports = JWT;
