const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator/check'),
    path = require('path');

const authentication = require('../middlewares/authentication')
UserController = require('../controllers/userController')
UploadFile = require('../services/uploadFiles');

Router
    .get('/proyects', UserController.getProyects)
    .get('/proyects/:category', UserController.getProyectsByCategory)
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
    .get('/users/picture', UserController.getProfilePicture)

    // POST
    .post('/proyects', authentication.isAuth, [
        check('title').exists().isString().isLength({ min: 1 }),
        check('shortDescription').exists().isString().isLength({ min: 1 }),
        check('category').exists().isString().isLength({ min: 1 }),
        check('ubication').exists().isString().isLength({ min: 1 }),
    ], UserController.createProyect)
    .post('/upload', UploadFile.userPhoto, UserController.updateProfilePicture)

    // PUT
    .put('/proyects/developer', authentication.isAuth, [
        check('idProyect').exists().isMongoId(),
        check('title').exists().isString().isLength({ min: 1 }),
        check('shortDescription').exists().isString().isLength({ min: 1 }),
        check('category').exists().isString().isLength({ min: 1 }),
        check('ubication').exists().isString().isLength({ min: 1 }),
    ], UserController.updateProyectDeveloper)
    .put('/proyects/production', authentication.isAuth, [
        check('idProyect').exists().isMongoId(),
        check('title').exists().isString().isLength({ min: 1 }),
        check('shortDescription').exists().isArray().isLength({ min: 1 }),
        check('linkVideo').exists().isString().isURL(),
        check('reward').exists().isArray().isLength({ min: 1 }),
        check('longDescriptions').exists().isArray().isLength({ min: 1 }),
        check('paymentAccount').exists(),
    ], UserController.updateProyectProduction)
    .put('/users/update', authentication.isAuth, [
        check('userName').exists().isString(),
        check('userFirstName').exists().isString(),
        check('userLastName').exists().isString(),
        check('userSurName').exists().isString(),
        check('userPassword').exists().isString(),
        check('userPhone').exists().isMobilePhone()
    ], UserController.updateProfile)
    .put('/proyects/update/status', authentication.isAuth, [
        check('idProyect').exists().isMongoId(),
    ], UserController.updateStatus)


module.exports = Router;