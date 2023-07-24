
const Student = require('../models/studentmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllStudents = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).json({ msg: 'Unauthorize user' })
    }
    else {
        const Students = await Student.find({}).sort({ id: -1 })
        res.status(200).json({ Students })
    }
})

const addStudent = asyncWrapper(async (req, res) => {
    try {
        const Students = await Student.find({})
        const length = Students.length;
        let newStudent = {
            ...req.body,
            id: length + 1
        }
        const student = await Student.create(newStudent)

        if (!student) {
            return next(createCustomError(`Please fill all the required fields`, 500))
        }
        else {
            res.status(201).json({ msg: "Student Added successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Student Already Exists" })
    }
})

const editStudent = asyncWrapper(async (req, res, next) => {
    const { id: studentID } = req.params
    const product = await Student.findOneAndUpdate({ _id: studentID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        return next(createCustomError(`No Product with id : ${studentID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Payment Details Updated Successfully" })
    }
})


const getSingleStudentDetails = async (req, res) => {
    const student = await Student.findOne({ _id: req.params.id })
    res.json({ data: student })
}

const addTestPerformanceDetails = asyncWrapper(async (req, res, next) => {
    const { id: studentID } = req.params
    const test = await Student.findOneAndUpdate({ _id: studentID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!test) {
        return next(createCustomError(`No Student found with id : ${studentID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Performance data updated successfully" })
    }
})


module.exports = {
    getAllStudents,
    addStudent,
    editStudent,
    getSingleStudentDetails,
    addTestPerformanceDetails
}