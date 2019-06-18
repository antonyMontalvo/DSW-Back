const { Schema, model } = require('mongoose');

const photo = new Schema({
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    imageId: { type: String, required: true }
})

module.exports = model('Photo', photo);