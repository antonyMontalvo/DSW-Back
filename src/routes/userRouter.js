const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator/check'),
    path = require('path');

const authentication = require('../middlewares/authentication')
UserController = require('../controllers/userController')
UploadFile = require('../services/uploadFiles');

Router
    .post('/signup', [
        check('userEmail').exists().isString().isEmail(),
        check('userFirstName').exists().isString(),
        check('userLastName').exists().isString(),
        check('userSurName').exists().isString(),
        check('userPassword').exists().isString()
    ], UserController.signup)
    .post('/signin', [
        check('userEmail').exists().isString().isEmail(),
        check('userPassword').exists().isString()
    ], UserController.signin);

/*
    Authentication
*/

Router
    // .get('/proyects/all', authentication.isAuth, UserController.)
    .get('/', authentication.isAuth, (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/home.html'));
    })
    .get('/upload', authentication.isAuth, UserController.getProfilePicture)
    // .post('/upload', UploadFile.userPhoto, UserController.updateProfilePicture)


module.exports = Router;