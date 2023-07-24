const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    testname: {
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

module.exports = mongoose.model('Test', TestSchema)