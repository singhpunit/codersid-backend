const Admin = require('../models/adminmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const addAdmin = asyncWrapper(async (req, res) => {
    const data = {
        email: "admin@test.com",
        password: "admin1234",
        role: "admin"
    }
    try {
        const student = await Admin.create(data)
        if (!student) {
            return next(createCustomError(`Please fill all the required fields`, 500))
        }
        else {
            res.status(201).json({ msg: "Admin Created successfully", role: "admin" })
        } 
    } catch (error) {
        res.status(400).json({ msg : "Email already exists"})
    }
    
})


module.exports = {
    addAdmin,
}