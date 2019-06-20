const bcrypt = require("bcryptjs"),
  { validationResult } = require('express-validator/check'),
  fs = require('fs-extra');

const jwt = require('../services/JWT'),
  User = require('../models/User'),
  Person = require('../models/Person'),
  Proyect = require('../models/Proyect'),
  UserController = {};

//////////////////////////////// Not Authenticate controllers

/* 
  Register user
*/
UserController.signup = async (req, res) => {
  let data = {
    userEmail: req.body.userEmail,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userSurName: req.body.userSurName,
    userPassword: await bcrypt.hash(req.body.userPassword, 10),
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }

    let userExists = await User.findOne({ email: data.userEmail });
    if (userExists) {
      return res.status(202).json({
        message: 'Email exists',
        status: 202
      });
    } else {
      const person = new Person({
        first_name: data.userFirstName,
        lastname_1: data.userLastName,
        lastname_2: data.userSurName,
      }), resultPerson = await person.save(); //guardando persona

      const user = new User({
        username: resultPerson.first_name,
        password: data.userPassword,
        person: resultPerson._id,
        email: data.userEmail,
      }), resultUser = await user.save(); //guardando usuario

      let objectResult = {
        userName: resultUser.username,
        userEmail: resultUser.email,
        userFirstName: resultPerson.first_name,
        userLastName: resultPerson.lastname_1,
        userSurName: resultPerson.lastname_2,
        userPhone: resultPerson.phone,
        userPhoto: resultUser.image,
        token: jwt.createToken({
          idUser: resultUser._id,
          username: resultUser.username,
          password: resultUser.password,
          person: resultUser.person
        }),
      };

      return res.status(200).json({
        message: objectResult,
        status: 200
      });
    }
  } catch (error) {
    return res.status(500).json({
      errors: error.stack,
      status: 500
    });
  }
}

/* 
  Signin user
*/
UserController.signin = async (req, res) => {
  let data = {
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) return res.status(422).json({
      error: errors.array(),
      status: 422
    });

    let userExists = await User.findOne({ email: data.userEmail });

    return userExists
      ? bcrypt.compare(data.userPassword, userExists.password, async (err, response) => {
        if (err) throw res.status(500).json({ error: err });

        let personExists = await Person.findById(userExists.person),
          objectResult = {
            userName: userExists.username,
            userEmail: userExists.email,
            userFirstName: personExists.first_name,
            userLastName: personExists.lastname_1,
            userSurName: personExists.lastname_2,
            userPhone: personExists.phone,
            userPhoto: userExists.image,
            token: jwt.createToken({
              idUser: userExists._id,
              username: userExists.username,
              password: userExists.password,
              person: userExists.person
            }),
          };

        return response == true
          ? res.status(200).json({
            message: objectResult,
            status: 200
          })
          : res.status(202).json({ message: 'Email or password wrong', status: 202 });
      })
      : res.status(202).json({ message: 'Email or password wrong', status: 202 });

  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

//////////////////////////////// Authenticate controllers

//////////////////////////////// GET

/* 
  Get all proyects more ranked
*/
UserController.getRankedProyects = async (req, res) => {
  try {
    const proyects = await Proyect.find();
    console.log(proyects)
    return proyects
      ? res.status(200).json({ message: proyects, status: 200 })
      : res.status(202).json({ message: '', status: 202 });

  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Get only profile picture
*/
UserController.getProfilePicture = async (req, res) => {
  try {
    let { idUser } = jwt.getPayload(req.headers.authorization);

    // const result = await Photo.find();

    return res.status(200).json({ message: result, status: 200 })
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

//////////////////////////////// POST

/* 
  Creat proyect method
*/
UserController.createProyect = async (req, res) => {
  let data = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    category: req.body.category,
    ubication: req.body.ubication,
    monetaryGoal: req.body.monetaryGoal,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    challenges: req.body.challenges,
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({ error: errors.array(), status: 422 });
    }

    const proyect = new Proyect({
      title: data.title,
      short_desc: data.shortDescription,
      category: data.category,
      ubication: data.ubication,
      monetary_goal: data.monetaryGoal,
      start_date: data.startDate,
      end_date: data.endDate,
      challenges: data.challenges,
    }), resultProyect = await proyect.save(); //guardando proyecto

    return res.status(200).json({ message: resultProyect, status: 200 });
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Update proyect
*/
UserController.updateProyect = async (req, res) => {
  let data = {
    idProyect: req.body.idProyect,
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    category: req.body.category,
    ubication: req.body.ubication,
    monetaryGoal: req.body.monetaryGoal,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    challenges: req.body.challenges,
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }

    const proyectExists = await Proyect.find({ _id: data.idProyect });
    console.log(proyectExists)
    if (proyectExists) {
      const proyect = new Proyect({
        short_desc: data.shortDescription,
        category: data.category,
        ubication: data.ubication,
        monetary_goal: data.monetaryGoal,
        start_date: data.startDate,
        end_date: data.endDate,
        challenges: data.challenges,
      });

      console.log(req.body.collaborators)
      if (req.body.collaborators) {
        proyect.collaborators = req.body.collaborators
      }

      // if(req.body.rewards){
      //   proyect
      // }
      // if(req.body.longDescriptions){

      // }
      // if(req.body.payment){

      // }

      // if(req.body.sponsors){

      // }

      const proyectUpdated = Proyect.findByIdAndUpdate(data.idProyect, proyect);
      console.log(proyectUpdated);
      return res.status(200).json({ message: proyectUpdated, status: 200 });
    } else {
      return res.status(202).json({ message: 'Noy exists this proyect', status: 202 });
    }
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Update only profile picture
*/
UserController.updateProfilePicture = async (req, res) => {
  const cloudinary = require('cloudinary').v2;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {

    let { idUser } = jwt.getPayload(req.headers.authorization);

    const resultUploadedImage = await cloudinary.uploader.upload(req.file.path);

    await User.updateOne({ _id: idUser }, {
      image: {
        imageURL: resultUploadedImage.url,
        imageId: resultUploadedImage.public_id,
      }
    });

    await fs.unlink(req.file.path);

    return res.status(200).json({
      message: resultUploadedImage.url,
      status: 200
    });
  } catch (error) {
    return res.status(500).json({
      error: error.stack,
      status: 500
    });
  }
}

module.exports = UserController;