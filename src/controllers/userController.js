const bcrypt = require("bcryptjs"),
  { validationResult } = require('express-validator/check');

const jwt = require('../services/JWT'),
  User = require('../models/User'),
  UserController = {};

UserController.signin = (req, res) => {
  let data = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  }, errors = validationResult(req);

  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : res.status(200).json({ message: 'Not initializated' });
}

module.exports = UserController;