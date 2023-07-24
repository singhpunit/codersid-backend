const mongoose = require('mongoose')

const BatchSchema = new mongoose.Schema({
    batchName: {
        type: String,
        required: [true, 'must provide batch name'],
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('BatchModal', BatchSchema)