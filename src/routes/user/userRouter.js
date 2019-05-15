const express = require('express'),
    Router = express.Router(),
    { check } = require('express-validator');

Router
    .get('/', (req, res) => {
        res.send('index');
    })

module.exports = Router;