const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    question: {
        type: String,
        unique: true
    },
    option1: {
        type: String,
    },
    option2: {
        type: String,
    },
    option3: {
        type: String,
    },
    option4: {
        type: String,
    },
    answer: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Question', QuestionSchema)