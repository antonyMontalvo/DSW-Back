const { Schema } = require('mongoose');

const UserPhoto = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    imageURL: { type: String, required: false, default: 'https://res.cloudinary.com/cloudinaryantony/image/upload/v1560870724/fetniak2u6pccnt6xnns.png' },
    imageId: { type: String, required: false, default: 'fetniak2u6pccnt6xnns' }
})

module.exports = UserPhoto;