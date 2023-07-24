const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    id: {
        type: Number,
      },
    StudentName: {
        type: String,
    },
    batchname: {
        type: String,
    },
    course: {
        type: String,
    },
    Email: {
        type: String,
    },
    contactdetails: {
        type: Number,
    },
    Amount: {
        type: Number,
    },
    PaymentType: {
        type: String,
    },
    PaymentMode: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Payment', PaymentSchema)