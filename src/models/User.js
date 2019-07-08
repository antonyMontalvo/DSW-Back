const { Schema, model } = require('mongoose');

const Photo = require('./UserPhoto');
const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    person: { type: Schema.Types.ObjectId, required: true },
    email: { type: String, required: true },
    // biografia
    born_date: { type: Date, required: false },
    interests: { type: [String], required: false },
    image: {
        type: Photo, required: false, default: {
            imageURL: 'https://res.cloudinary.com/cloudinaryantony/image/upload/v1560870724/fetniak2u6pccnt6xnns.png',
            imageId: 'fetniak2u6pccnt6xnns'
        }
    },
    my_proyects: { type: [Schema.Types.ObjectId], ref: 'proyects' ,required: false, default: [] },
    patr_proyects: { // Patrocinadores
        type: [{
            _id: { type: Schema.Types.ObjectId, required: false },
            favorites: { type: Boolean, required: true }
        }], required: false
    }
});

module.exports = model('users', UserSchema);