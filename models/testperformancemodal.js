const mongoose = require('mongoose')

const PerformanceSchema = new mongoose.Schema({
    studentid: {
        type: Number,
      },
    Studentname: {
        type: String,
        unique: true
    },
    batchname: {
        type: String,
    },
    testname: {
        type: String,
    },
    category: {
        type: String,
    },
    score: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Performance', PerformanceSchema)