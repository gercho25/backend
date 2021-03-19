const mongoose = require('mongoose');

const valueSchema = mongoose.Schema({
    presion: {
        type: Number,
        required: false,
        min: 0,
        max: 1000
    },
    caudal: {
        type: Number,
        required: false,
        min: 0,
        max: 1000
    },
    viento: {
        type: Number,
        required: false,
        min: 0.01,
        max: 81
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Value', valueSchema);