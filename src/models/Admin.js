const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    person: { type: Schema.Types.ObjectId, required: true }
});

module.exports = model('admins', AdminSchema);