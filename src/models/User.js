const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    person: Schema.Types.ObjectId,
    born_date: Date,
    interests: [String],
    email: String,
    my_proyects: [Schema.Types.ObjectId],
    patr_proyects: [new Schema({
        _id: Schema.Types.ObjectId,
        favorites: Boolean
    })]
})

module.exports = model('users', UserSchema);