const { Schema, model } = require('mongoose');

const photo = new Schema({
    title: String,
    imageURL: String,
    imageId: String
})

module.exports = model('Photo', photo);