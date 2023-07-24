
const Question = require('../models/questionmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllQuestions = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Questions = await Question.find({})
    res.status(200).json({ Questions })
    }
})

const createQuestion = asyncWrapper(async (req, res) => {
    try {
        const Questions = await Question.find({})
        const length = Questions.length;
        let newQuestion = {
            ...req.body,
            id: length + 1
        }
        const question = await Question.create(newQuestion)

        if (!question) {
            return next(createCustomError(`Please fill all the required fields`, 500))
        }
        else {
            res.status(201).json({ msg: "Question Added successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Question Already Exists" })
    }
})

const editQuestion = asyncWrapper(async (req, res, next) => {
    const { id: questionID } = req.params
    const product = await Question.findOneAndUpdate({ _id: questionID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        return next(createCustomError(`No Question found with id : ${questionID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Question Details Updated Successfully" })
    }
})

const deleteQuestion = asyncWrapper(async (req, res) => {
    const { id: questionID } = req.params
    const question = await Question.findOneAndDelete({ _id: questionID })
    try {
        if (!question) {
            res.status(400).json({ msg: `No question found with id: ${questionID}` })
        }
        else {
            res.status(200).json({ msg: "Question Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid question id" })
    }
})

const deleteAllQuestion = asyncWrapper(async (req, res) => {
    const question = await Question.deleteMany({})
    try {
        if (!question) {
            res.status(400).json({ msg: `No question found` })
        }
        else {
            res.status(200).json({ msg: "Questions Moved Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid question id" })
    }
})


module.exports = {
    getAllQuestions,
    createQuestion,
    editQuestion,
    deleteQuestion,
    deleteAllQuestion
}