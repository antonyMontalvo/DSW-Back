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
    monetary_goal: { type: Number, required: true, default: 0  },
    start_date: { type: Date, required: true, default: null  },
    end_date: { type: Date, required: true, default: null  },
    challenges: { type: String, required: true, default: ''  },
    link_video: { type: String, required: false, default: '' },
    friends: { type: [String], required: false },
    collaborators: { type: [Schema.Types.objectId], required: false },
    reward: { // Recompensas
        type: [Reward], required: false
    },
    long_desc: { // Descripciones
        type: [LongDescription], required: false
    },
    payment_account: { // Metodo de pago
        type: Payment, required: false
    },
    sponsors: { // Colaboradores
        type: [Sponsor], required: false
    },
    percentage: { type: Number, required: true, max: 100, default: 33.3 },
});

/* let proyectUpdated1 = [];
let proyectUpdated2 = [];
let proyectUpdated3 = {};
if (req.body.reward) {
    proyectUpdated1 = await Proyect.findOneAndUpdate({ _id: data.idProyect }, {
        $set: { reward: req.body.reward }
    }, { new: true });
}

if (req.body.longDescriptions) {
    proyectUpdated2 = await Proyect.findOneAndUpdate({ _id: data.idProyect }, {
        $set: { long_desc: req.body.longDescriptions }
    }, { new: true });
}

if (req.body.payMethod) {
    proyectUpdated3 = await Proyect.findOneAndUpdate({ _id: data.idProyect }, {
        pay_verification: req.body.payMethod
    }, { new: true });
} */


module.exports = model('proyects', ProyectSchema);