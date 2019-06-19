const { Schema, model } = require('mongoose');

const ProyectSchema = new Schema({
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    category: { type: String, required: true },
    ubication: { type: String, required: true },
    monetary_goal: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    reward: { // Recompensas
        type: [{
            _id: { type: Schema.Types.ObjectId, required: false },
            title: { type: String, required: true },
            description: { type: String, required: false, default: '' },
            min_amount: { type: Number, required: true, default: 0 },
            estimated_time: { type: String, required: true },
        }], required: false
    },
    challenges: { type: String, required: true },
    long_desc: { // Descripciones
        type: [{
            _id: { type: Schema.Types.ObjectId, required: false },
            title: { type: String, required: true },
            description: { type: String, required: true },
        }], required: false
    },
    collaborators: { type: [Schema.Types.objectId], required: false },
    pay_verification: { // Metodo de pago
        type: {
            _id: { type: Schema.Types.ObjectId, required: false },
            identification_card: { type: String, required: true },
            credit_card: { type: String, required: true, maxLength: 12 },
            owner_name: { type: String, required: true },
        }, required: false
    },
    sponsors: { // Colaboradores
        type: [{
            _id: { type: Schema.Types.ObjectId, required: false },
            id_sponsor: { type: Schema.Types.ObjectId, required: true },
            amount: { type: String, required: true }
        }], required: false
    },
});


module.exports = model('proyects', ProyectSchema);