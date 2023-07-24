const mongoose = require('mongoose')

const WalkinSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
    required: [true, 'must provide product student name'],
    trim: true,
    unique: true
  },
  contactdetails: {
    type: Number,
    required: [true, 'must provide contact details'],
  },
  emailid: {
    type: String,
    required: [true, 'must provide email id'],
    trim: true,
    unique: true
  },
  address: {
    type: String,
    required: [true, 'must provide address'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'must provide address'],
    trim: true,
  },
  education: {
    type: String,
    required: [true, 'must provide address'],
    trim: true,
  },
  employementStatus: {
    type: String,
    required: [true, 'must provide employement status'],
  },
  comments : [
    {
      type: String
    }
  ],
  status: {
    type: String
  },
  source: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('WalkIns', WalkinSchema)