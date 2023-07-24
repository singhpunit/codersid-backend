const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    unique: true
  },
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
  permission: [{
    type: String
  }], 
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('UserModal', UserSchema)