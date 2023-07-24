const mongoose = require('mongoose')

const StudentFeedbackSchema = new mongoose.Schema({
    studentname: {
        type: String,
    },
    batchname: {
        type: String
    },
    studentid: {
        type: Number,
    }, 
    feedbackid: {
        type: String,
    },
    feedbackname: {
        type: String
    },
    feedbackcategory: {
        type: String
    },
    feedbackResponse: [{}],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('StudentFeedback', StudentFeedbackSchema)