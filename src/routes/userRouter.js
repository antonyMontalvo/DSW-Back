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
    // GET
    .get('/proyects/all', authentication.isAuth, UserController.getRankedProyects)
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../views/home.html'));
    })
    .get('/upload', UserController.getProfilePicture)

    // POST
    .post('/proyects', authentication.isAuth, [
        check('title').exists().isString().isLength({min: 1}),
        check('shortDescription').exists().isString().isLength({min: 1}),
        check('category').exists().isString().isLength({min: 1}),
        check('ubication').exists().isString().isLength({min: 1}),
        check('monetaryGoal').exists().isNumeric(),
        check('startDate').exists().isISO8601(),
        check('endDate').exists().isISO8601(),
        check('challenges').exists().isString().isLength({min: 1}),
    ], UserController.createProyect)
    .post('/upload',  UploadFile.userPhoto, UserController.updateProfilePicture)

    // PUT
    .put('/proyects', authentication.isAuth, [
        check('idProyect').exists().isMongoId(),
        check('title').exists().isString().isLength({min: 1}),
        check('shortDescription').exists().isString().isLength({min: 1}),
        check('category').exists().isString().isLength({min: 1}),
        check('ubication').exists().isString().isLength({min: 1}),
        check('monetaryGoal').exists().isNumeric(),
        check('startDate').exists().isISO8601(),
        check('endDate').exists().isISO8601(),
        check('challenges').exists().isString().isLength({min: 1}),
    ], UserController.updateProyect)


module.exports = Router;