const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'must provide email address'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'must provide password'],
    trim: true,
  },
  role: {
    type: String,
    default: "user",
    trim: true,
  },
  
  
})

module.exports = mongoose.model('User', AdminSchema)