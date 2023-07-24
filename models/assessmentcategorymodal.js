const mongoose = require('mongoose')

const AssessmentCategorySchema = new mongoose.Schema({
    assessmentcategoryName: {
        type: String,
        required: [true, 'must provide assessment category name'],
        trim: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('AssessmentCategoryModal', AssessmentCategorySchema)