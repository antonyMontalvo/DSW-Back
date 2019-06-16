const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator/check'),
    path = require('path');

const authentication = require('../../middlewares/authentication')
    UserController = require('../../controllers/userController')
    UploadFile = require('../../services/uploadFiles');

Router
    .post('/signin',  [
        check('userEmail').exists().isString().isEmail(),
        check('userPassword').exists().isString()
    ], UserController.signin);

/*
    Authentication
*/

Router
    .get('/' , (req, res) => {
        res.sendFile(path.join(__dirname + '/../../views/home.html'));
    })
    .post('/upload', UploadFile.userPhoto , (req, res) => {
		res.send('Upload')
	});

module.exports = Router;