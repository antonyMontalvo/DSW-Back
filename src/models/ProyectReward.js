const { Schema } = require('mongoose');

const RewardSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    title: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    min_amount: { type: Number, required: true, default: 0 }
});

module.exports = RewardSchema;
