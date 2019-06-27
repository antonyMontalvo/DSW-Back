const bcrypt = require("bcryptjs"),
  { validationResult } = require('express-validator/check'),
  fs = require('fs-extra');

const jwt = require('../services/JWT'),
  User = require('../models/User'),
  Person = require('../models/Person'),
  Proyect = require('../models/Proyect'),
  UserController = {};

//////////////////////////////// Not Authenticate controllers

//////////////////////////////// GET

UserController.getProyects = async (req, res) => {
  try {
    const proyects = await Proyect.find({ status_publication: false });

    return proyects
      ? res.status(200).json({ message: proyects, status: 200 })
      : res.status(202).json({ message: [], status: 202 });

  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Get all proyects filter category
*/
UserController.getProyectsByCategory = async (req, res) => {
  try {
    const proyects = await Proyect.find({ category: req.params.category });
    return proyects
      ? res.status(200).json({ message: proyects, status: 200 })
      : res.status(202).json({ message: [], status: 202 });

  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

//////////////////////////////// POST

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
          email: resultUser.email,
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
              email: userExists.email,
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

    const result = await User.findOne({ _id: idUser }, { _id: 0, image: 1 });

    if (result.image) {
      return res.status(200).json({ message: result.image, status: 200 })
    } else {
      return res.status(202).json({ message: 'Not have image profile', status: 202 })
    }
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Get proyects by user
*/
UserController.getProyectsByUser = async (req, res) => {
  try {
    let { idUser, email } = jwt.getPayload(req.headers.authorization);
    const proyectsByUser = await User.aggregate([
      { $match: { email: email } },
      {
        $lookup:
        {
          from: 'proyects',
          localField: 'my_proyects',
          foreignField: '_id',
          as: 'projects'
        }
      }
    ]);
    const proyectsBy = await User.findById(idUser).populate('proyects');
    console.log(proyectsBy)

    return proyectsByUser.length
      ? res.status(200).json({ message: proyectsByUser[0].projects, status: 200 })
      : res.status(202).json({ message: [], status: 202 });

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
    }), resultProyect = await proyect.save(); //guardando proyecto

    let { idUser } = jwt.getPayload(req.headers.authorization);
    const userUpdated = await User.findOneAndUpdate({ _id: idUser }, { $push: { my_proyects: resultProyect._id } }, { new: true, upsert: true });

    if (userUpdated) {
      return res.status(200).json({ message: proyect, status: 200 });
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

/* 
  Postulate new proyect
*/
UserController.postulateProyect= async (req, res) => {
  let data = {
    idProyect: req.body.idProyect,
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }
    let { idUser } = jwt.getPayload(req.headers.authorization);

    if (userProyect) {
      proyectExists = await Proyect.findOne({ _id: userProyect.my_proyects[0] });

      return res.status(200).json({ message: proyectExists, status: 200 });
    } else {
      return res.status(200).json({ message: 'Not exists this proyect', status: 202 });
    }
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

//////////////////////////////// PUT

/* 
  Update user profile
*/
UserController.updateProfile = async (req, res) => {
  let data = {
    userName: req.body.userName,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userSurName: req.body.userSurName,
    userPassword: await bcrypt.hash(req.body.userPassword, 10),
    userPhone: req.body.userPhone,
    userBornDate: req.body.userBornDate,
    userInterests: req.body.userInterests,
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }

    let { idUser, person } = jwt.getPayload(req.headers.authorization);
    const userUpdated = await User.findOneAndUpdate({ _id: idUser }, {
      username: data.userName,
      password: data.userPassword,
      born_date: data.userBornDate,
      interests: data.userInterests,
    }, { new: true });

    const personUpdated = await Person.findOneAndUpdate({ _id: person }, {
      first_name: data.userFirstName,
      lastname_1: data.userLastName,
      lastname_2: data.userSurName,
      phone: data.userPhone
    }, { new: true });

    let objectResult = {
      userName: userUpdated.username,
      userEmail: userUpdated.email,
      userFirstName: personUpdated.first_name,
      userLastName: personUpdated.lastname_1,
      userSurName: personUpdated.lastname_2,
      userPhone: personUpdated.phone,
      userPhoto: userUpdated.image,
      token: jwt.createToken({
        idUser: userUpdated._id,
        email: userUpdated.email,
        password: userUpdated.password,
        person: userUpdated.person
      }),
    };

    return res.status(200).json({
      message: objectResult,
      status: 200
    });

  } catch (error) {
    return res.status(500).json({
      errors: error.stack,
      status: 500
    });
  }
}

/* 
  Update project in development status
*/
UserController.updateProyectDeveloper = async (req, res) => {
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
    linkVideo: req.body.linkVideo,
    friends: req.body.friends,
    reward: req.body.reward,
    longDescriptions: req.body.longDescriptions,
    paymentAccount: req.body.paymentAccount
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }

    const proyectUpdated = await Proyect.findOneAndUpdate({ _id: data.idProyect }, {
      title: data.title,
      short_desc: data.shortDescription,
      category: data.category,
      ubication: data.ubication,
      monetary_goal: data.monetaryGoal,
      start_date: data.startDate,
      end_date: data.endDate,
      challenges: data.challenges,
      link_video: data.linkVideo,
      friends: data.friends,
      reward: data.reward,
      long_desc: data.longDescriptions,
      payment_account: data.paymentAccount
    }, { new: true });

    return res.status(200).json({ message: proyectUpdated, status: 200 });
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Update proyect in publication status
*/
UserController.updateProyectProduction = async (req, res) => {
  let data = {
    idProyect: req.body.idProyect,
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    linkVideo: req.body.linkVideo,
    friends: req.body.friends,
    reward: req.body.reward,
    longDescriptions: req.body.longDescriptions,
    paymentAccount: req.body.paymentAccount
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }

    const proyectUpdated = await Proyect.findOneAndUpdate({ _id: data.idProyect }, {
      title: data.title,
      short_desc: data.shortDescription,
      link_video: data.linkVideo,
      friends: data.friends,
      reward: data.reward,
      long_desc: data.longDescriptions,
      payment_account: data.paymentAccount
    }, { new: true });

    return res.status(200).json({ message: proyectUpdated, status: 200 });
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

/* 
  Update status of complete proyect
*/
UserController.updateStatus = async (req, res) => {
  let data = {
    idProyect: req.body.idProyect,
  }, errors = validationResult(req);

  try {
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array(),
        status: 422
      });
    }
    let { idUser } = jwt.getPayload(req.headers.authorization),
      proyectExists = {};
    const userProyect = await User.findOne({ _id: idUser, my_proyects: data.idProyect }, { _id: 0, my_proyects: 1 });

    if (userProyect) {
      proyectExists = await Proyect.findOne({ _id: userProyect.my_proyects[0] });

      if (proyectExists.monetary_goal.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      if (proyectExists.start_date.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      if (proyectExists.end_date.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      if (proyectExists.challenges.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      if (proyectExists.reward.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      if (proyectExists.long_desc.state) proyectExists = await Proyect.findOneAndUpdate({ _id: userProyect.my_proyects[0] }, { $inc: { percentage: 10 } }, { new: true });
      return res.status(200).json({ message: proyectExists, status: 200 });
    } else {
      return res.status(200).json({ message: 'Not exists this proyect', status: 202 });
    }
  } catch (error) {
    return res.status(500).json({ errors: error.stack, status: 500 });
  }
}

module.exports = UserController;