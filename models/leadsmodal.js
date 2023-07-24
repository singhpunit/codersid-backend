const mongoose = require('mongoose')
const moment = require('moment');

const LeadsSchema = new mongoose.Schema({
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
  comments: [
    {
      comment: {
        type: String,
      },
      commentAt: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a')
      }
    }
  ],
  
  status: {
    type: String
  },
  source: {
    type: String,
  },
  date: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Leads', LeadsSchema)