const WalkIn = require('../models/walkinmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllWalkIns = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).json({ msg: 'Unauthorize user' })
    }
    else {
        const WalkIns = await WalkIn.find({}).sort({ id: -1 })
        res.status(200).json({ WalkIns })
    }
})

const addWalkin = asyncWrapper(async (req, res) => {
    try {
        const WalkIns = await WalkIn.find({})
        const length = WalkIns.length;
        let newLead = {
            ...req.body,
            id: length + 1
        }
        const walkin = await WalkIn.create(newLead)
    if (!walkin) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Lead Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Lead Already Exists" })
    }  
})

module.exports = {
    getAllWalkIns,
    addWalkin
}