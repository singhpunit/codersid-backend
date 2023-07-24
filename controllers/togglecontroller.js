
const Toggle = require('../models/togglemodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const editToggle = asyncWrapper(async (req, res, next) => {
    const toggle = await Student.findOneAndUpdate(req.body, {
        new: true,
        runValidators: true,
    })
    if (!toggle) {
        return next(createCustomError(`Error`, 400))
    }
    else {
        res.status(200).json({ msg: "Toggle Updated Successfully" })
    }
})


module.exports = {
    editToggle
}