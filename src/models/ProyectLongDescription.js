const { Schema } = require('mongoose');

const LongDescriptionSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    position: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false, default: '' },
});

module.exports = LongDescriptionSchema;
