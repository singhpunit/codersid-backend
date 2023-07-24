const mongoose = require('mongoose')

const feedbackCategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: [true, 'must provide category name'],
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('FeedbackCategory', feedbackCategorySchema)