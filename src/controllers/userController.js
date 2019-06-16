const bcrypt = require("bcryptjs"),
  { validationResult } = require('express-validator/check'),
  fs = require('fs-extra');

const jwt = require('../services/JWT'),
  User = require('../models/User'),
  Photo = require('../models/Photo'),
  UserController = {};

// cloudinary.config({
//   cloud_name: 'dolkycd4b',
//   api_key: '441316826627531',
//   api_secret: 'WbZJS-hxug48LMq5YnniC430raA',
// });
// cloudinary.url()

UserController.signin = (req, res) => {
  let data = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  }, errors = validationResult(req);

  return !errors.isEmpty()
    ? res.status(422).json({ errors: errors.array() })
    : res.status(200).json({ message: 'Not initializated' });
}

UserController.updateProfilePicture = async (req, res) => {
  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    // console.log(result);
    const newPhoto = new Photo({
      title: 'test',
      imageURL: result.url,
      imageId: result.public_id
    })
    await newPhoto.save();
    await fs.unlink(req.file.path);
    return res.status(200).json({ message: 'upload' })
  } catch (error) {
    console.log(error)
  }
}

UserController.getProfilePicture = async (req, res) => {
  try {
    let { _idUser } = jwt.getPayload(req.headers.authorization);
    
    const result = await Photo.find({ _id: _idUser });

    return res.status(200).json({ message: result })
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
}

module.exports = UserController;