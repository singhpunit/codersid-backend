const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'must provide course name'],
        trim: true,
        unique: true
    },
    coursePrice: {
        type: Number,
        required: [true, 'must provide course price'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('CourseModal', CourseSchema)