const mongoose = require('mongoose')

const FeedbackQuestionSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    question: {
        type: String,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('FeedbackQuestion', FeedbackQuestionSchema)