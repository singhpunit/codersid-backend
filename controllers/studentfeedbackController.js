
const StudentFeedback = require('../models/studentfeedbackModal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllStudentFeedback = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const StudentFeedbacks = await StudentFeedback.find({})
    res.status(200).json({ StudentFeedbacks })
    }
})

const getSingleStudentFeedback = async (req, res) => {
    const studentfeedback = await StudentFeedback.findOne({ _id: req.params.id })
    res.json({ id: studentfeedback })
}

const createStudentFeedback = asyncWrapper(async (req, res) => {
    try {
        const studentfeedback = await StudentFeedback.create(req.body)
    if (!studentfeedback) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Student Feedback Added successfully" })
    }
    } catch (error) {
        // res.status(400).json({ msg: error.errors })
        console.log(error);
    }  
})

const deleteStudentFeedback = asyncWrapper(async (req, res) => {
    const { id: feedbackID } = req.params
    const test = await StudentFeedback.findOneAndDelete({ _id: feedbackID })
    try {
        if (!test) {
            res.status(400).json({ msg: `No Student feedback found with id: ${feedbackID}` })
        }
        else {
            res.status(200).json({ msg: "Student Feedback Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Student Feedback id" })
    }
})


module.exports = {
    getAllStudentFeedback,
    createStudentFeedback,
    deleteStudentFeedback,
    getSingleStudentFeedback,
}