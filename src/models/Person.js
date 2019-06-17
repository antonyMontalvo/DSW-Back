const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    first_name: String,
    lastname_1: String,
    lastname_2: String,
    phone: {type: "String", default: null},
})

module.exports = model('peoples', PersonSchema);