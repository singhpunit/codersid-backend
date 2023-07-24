
const Test = require('../models/testmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const {ObjectId } = require('mongodb');

const getAllTest = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Tests = await Test.find({})
    res.status(200).json({ Tests })
    }
})

const getSingleTest = async (req, res) => {
    const test = await Test.findOne({ _id: req.params.id })
    res.json({ id: test })
}

const createTest = asyncWrapper(async (req, res) => {
    try {
        const test = await Test.create(req.body)
    if (!test) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Test Added successfully" })
    }
    } catch (error) {
        // res.status(400).json({ msg: error.errors })
        console.log(error);
    }  
})

const deleteTest = asyncWrapper(async (req, res) => {
    const { id: testID } = req.params
    const test = await Test.findOneAndDelete({ _id: testID })
    try {
        if (!test) {
            res.status(400).json({ msg: `No question found with id: ${testID}` })
        }
        else {
            res.status(200).json({ msg: "Test Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid test id" })
    }
})

const updateTest = asyncWrapper(async (req, res, next) => {
    const { id: testID } = req.params
    const test = await Test.findOneAndUpdate({ _id: testID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!test) {
        return next(createCustomError(`No test found with id : ${testID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Exipry Date Updated Successfully" })
    }
})

const deleteAssessmentQuestion = asyncWrapper(async (req, res) => {
    const { id: questionID } = req.params
    const question = await Test.updateOne(
        { 'questionslist._id': questionID },
        { "$pull": {
            "questionslist": {
                "_id": questionID
            }
        }}
        )
    try {
        if (!question) {
            res.status(400).json({ msg: `No Question found with id: ${questionID}` })
        }
        else {
            res.status(200).json({ msg: "Assessment Question Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Assessment Question id" })
    }
})

const updateAssessmentQuestion = asyncWrapper(async (req, res) => {
    const { id: questionID } = req.params
    const question = await Test.findOneAndUpdate(
        { 'questionslist._id': questionID },
        { $set: { 'questionslist.$': req.body } },
        {
            new: true,
            runValidators: true,
        })
    try {
        if (!question) {
            res.status(400).json({ msg: `No Question found with id: ${questionID}` })
        }
        else {
            res.status(200).json({ msg: "Assessment Question Updated Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Assessment Question id" })
    }
})

const addAssessmentQuestion = asyncWrapper(async (req, res) => {
    const { id: testID } = req.params
    const newObjectId = new ObjectId();
    const payload = {
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        option4: req.body.option4,
        answer: req.body.answer,
        _id: newObjectId.toString(),
        id: req.body.id
    }
    const assessmentQuestion = await Test.updateOne(
        {  _id: testID },
        { "$push": {
            "questionslist": payload
        }}
        )
    try {
        if (!assessmentQuestion) {
            return next(createCustomError(`Please fill all the required fields`, 500))
        }
        else {
            res.status(200).json({ msg: "Assessment Question Added Successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Assessment Question Already Exists" })
    }
})


module.exports = {
    getAllTest,
    createTest,
    deleteTest,
    getSingleTest,
    updateTest,
    deleteAssessmentQuestion,
    updateAssessmentQuestion,
    addAssessmentQuestion
}