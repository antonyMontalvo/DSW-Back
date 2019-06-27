const { Schema, model } = require('mongoose');

const Payment = require('./ProyectPayment');
const Reward = require('./ProyectReward');
const LongDescription = require('./ProyectLongDescription');
const Sponsor = require('./ProyectSponsor');
const Image = require('./ProyectImage');
const Collaborator = require('./ProyectCollaborator');

const ProyectSchema = new Schema({
    title: { type: String, required: true },
    short_desc: { type: String, required: true },
    category: { type: String, required: true },
    ubication: { type: String, required: true },
    monetary_goal: { type: Number, required: false, default: null },
    start_date: { type: Date, required: false, default: null },
    end_date: { type: Date, required: false, default: null },
    challenges: { type: String, required: false, default: null },
    link_video: { type: String, required: false, default: null },
    friends: { type: [String], required: false },
    collaborators: { type: [Collaborator], required: false },
    image: {
        type: Image, required: false, default: {
            imageURL: 'https://res.cloudinary.com/cloudinaryantony/image/upload/v1561518981/dou3dwftzkhozfx13ecp.jpg',
            imageId: 'dou3dwftzkhozfx13ecp'
        }
    },
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
    percentage: { type: Number, required: true, max: 100, default: 40 },
    status_publication: { type: Boolean, required: true, default: false }
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