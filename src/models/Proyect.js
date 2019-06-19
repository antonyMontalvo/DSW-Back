const { Schema, model } = require('mongoose');

const Payment = require('./ProyectPayment');
const Reward = require('./ProyectReward');
const LongDescription = require('./ProyectLongDescription');
const Sponsor = require('./ProyectSponsor');

const ProyectSchema = new Schema({
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    category: { type: String, required: true },
    ubication: { type: String, required: true },
    monetary_goal: { type: Number, required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    challenges: { type: String, required: true },
    link_video: { type: String, required: false, default: '' },
    collaborators: { type: [Schema.Types.objectId], required: false },
    reward: { // Recompensas
        type: [Reward], required: false
    },
    long_desc: { // Descripciones
        type: [LongDescription], required: false
    },
    pay_verification: { // Metodo de pago
        type: Payment, required: false
    },
    sponsors: { // Colaboradores
        type: [Sponsor], required: false
    },
});


module.exports = model('proyects', ProyectSchema);