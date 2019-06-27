const { Schema } = require('mongoose');

const SponsorSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, default: '' },
    amount: { type: String, required: true }
});

module.exports = SponsorSchema;
