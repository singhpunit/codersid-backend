
const TestPerformance = require('../models/testperformancemodal');
const asyncWrapper = require('../middleware/async')


const getAllTestPerformance = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).json({ msg: 'Unauthorize user' })
    }
    else {
        const TestPerformances = await TestPerformance.find({})
        res.status(200).json({ TestPerformances })
    }
})


const addTestPerformance = asyncWrapper(async (req, res) => {
    try {
        const testPerformance = await TestPerformance.create(req.body)
    if (!testPerformance) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Test Performance Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Test Performance Already Exists" })
    }  
})

const deleteTestPerformance = asyncWrapper(async (req, res) => {
    const { id: testPerformanceID } = req.params
    const testPerformance = await TestPerformance.findOneAndDelete({ _id: testPerformanceID })
    try {
        if (!testPerformance) {
            res.status(400).json({ msg: `No Test Performance found with id: ${testPerformanceID}` })
        }
        else {
            res.status(200).json({ msg: "Test Performance Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Test Performance id" })
    }
})

const deleteAllTestPerformance = asyncWrapper(async (req, res) => {
    const testPerformance = await TestPerformance.deleteMany({})
    try {
        if (!testPerformance) {
            res.status(400).json({ msg: `No question found` })
        }
        else {
            res.status(200).json({ msg: "Test Performance Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Test Performance id" })
    }
})


module.exports = {
    getAllTestPerformance,
    addTestPerformance,
    deleteTestPerformance,
    deleteAllTestPerformance
}