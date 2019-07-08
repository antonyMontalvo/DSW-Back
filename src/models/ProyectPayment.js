const { Schema } = require('mongoose');

const PaymentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, required: false },
    identification_card: { type: String, required: true },
    credit_card: { type: String, required: true, maxLength: 12 },
    owner_name: { type: String, required: true },
});

module.exports = PaymentSchema;
