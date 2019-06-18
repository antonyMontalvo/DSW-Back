const { Schema, model } = require('mongoose');

const RewardSchema = require('./Reward'),
    ProyectSchema = new Schema({
        title: { type: String, required: true },
        short_desc: { type: String, required: true },
        category: { type: String, required: true },
        ubication: { type: String, required: true },
        monetary_goal: { type: String, required: true },
        start_date: { type: String, required: true },
        end_date: { type: String, required: true },
        reward: { // Recompensas
            type: [{
                title: { type: String, required: true },
                description: { type: String, required: false, default: '' },
                min_amount: { type: Number, required: true, default: 0 },
                estimated_time: { type: String, required: true },
            }], required: false
        },
        challenges: { type: String, required: true },
        long_desc: { type: String, required: true },
        collaborators: { type: String, required: true },
        pay_verification: { type: String, required: true },
        patrocinator: { type: String, required: true },
    });


module.exports = model('proyects', ProyectSchema);