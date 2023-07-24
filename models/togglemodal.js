const mongoose = require('mongoose')

const ToggleModal = new mongoose.Schema({
    Toggle: {
        type: Boolean,
        default: false,
      }
})

module.exports = mongoose.model('ToggleModal', ToggleSchema)