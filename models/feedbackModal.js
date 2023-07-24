const mongoose = require('mongoose')

const feedback = new mongoose.Schema({
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    questionslist: [{
        
    }],
    expiryDate: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('feedback', feedback)