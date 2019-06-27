const { Schema } = require('mongoose');

const ProyectCollaboratorSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    name: { type: String, required: true, default: '' },
    lastname: { type: String, required: true, default: '' },
    dni: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    phone: { type: String, required: true, default: '' },
});

module.exports = ProyectCollaboratorSchema;