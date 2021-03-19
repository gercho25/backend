const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Token', tokenSchema);