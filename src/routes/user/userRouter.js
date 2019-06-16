const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator'),
    path = require('path');

Router
    .get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../../views/home.html'));
        // res.status(200).json({mes:'index'});
    })
    .post('/upload', (req, res) => {
		res.send('Upload')
	});

module.exports = Router;