const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator/check'),
    path = require('path');

const authentication = require('../../middlewares/authentication')
    UserController = require('../../controllers/userController');

Router
    // .post('/signin',  [
    //     check('userEmail').exists().isString().isEmail(),
    //     check('userPassword').exists().isString()
    // ], UserController);

/*
    Authentication
*/

Router
    .get('/', authentication.isAuth , (req, res) => {
        res.sendFile(path.join(__dirname + '/../../views/home.html'));
        // res.status(200).json({mes:'index'});
    })
    .post('/upload', (req, res) => {
		res.send('Upload')
	});

module.exports = Router;