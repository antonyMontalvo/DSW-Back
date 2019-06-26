const { Schema } = require('mongoose');

const ProyectImage = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    imageURL: { type: String, required: false, default: 'https://res.cloudinary.com/cloudinaryantony/image/upload/v1561518981/dou3dwftzkhozfx13ecp.jpg' },
    imageId: { type: String, required: false, default: 'dou3dwftzkhozfx13ecp' }
})

module.exports = ProyectImage;