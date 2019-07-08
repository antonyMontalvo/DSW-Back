const { Schema, model } = require('mongoose');

const PersonSchema = new Schema({
    first_name: { type: String, required: true },
    lastname_1: { type: String, required: true },
    lastname_2: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
});

module.exports = model('peoples', PersonSchema);