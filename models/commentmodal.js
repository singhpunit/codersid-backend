const mongoose = require('mongoose')
const moment = require('moment');

const CommentSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    username: {
        type: String
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
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Comments', CommentSchema)