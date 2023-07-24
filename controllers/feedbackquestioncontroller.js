
const FeedbackQuestion = require('../models/feedbackquestionmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllFeedbackQuestions = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const FeedbackQuestions = await FeedbackQuestion.find({})
    res.status(200).json({ FeedbackQuestions })
    }
})

const createFeedbackQuestion = asyncWrapper(async (req, res) => {
    try {
        const FeedbackQuestions = await FeedbackQuestion.find({})
        const length = FeedbackQuestions.length;
        let newFeedbackQuestion = {
            ...req.body,
            id: length + 1
        }
        const feedbackquestion = await FeedbackQuestion.create(newFeedbackQuestion)

        if (!feedbackquestion) {
            return next(createCustomError(`Please fill all the required fields`, 500))
        }
        else {
            res.status(201).json({ msg: "Feedback Question Added successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Feedback Question Already Exists" })
    }
})

const editFeedbackQuestion = asyncWrapper(async (req, res, next) => {
    const { id: feedbackquestionID } = req.params
    const product = await FeedbackQuestion.findOneAndUpdate({ _id: feedbackquestionID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!product) {
        return next(createCustomError(`No Feedback Question found with id : ${feedbackquestionID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Feedback Question Details Updated Successfully" })
    }
})

const deleteFeedbackQuestion = asyncWrapper(async (req, res) => {
    const { id: feedbackquestionID } = req.params
    const feedbackquestion = await FeedbackQuestion.findOneAndDelete({ _id: feedbackquestionID })
    try {
        if (!feedbackquestion) {
            res.status(400).json({ msg: `No Feedback question found with id: ${feedbackquestionID}` })
        }
        else {
            res.status(200).json({ msg: "Feedback Question Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid feedback question id" })
    }
})

const deleteAllFeedbackQuestion = asyncWrapper(async (req, res) => {
    const feedbackquestion = await FeedbackQuestion.deleteMany({})
    try {
        if (!feedbackquestion) {
            res.status(400).json({ msg: `No feeback question found` })
        }
        else {
            res.status(200).json({ msg: "Feedback Questions Moved Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid feedback question id" })
    }
})


module.exports = {
    getAllFeedbackQuestions,
    createFeedbackQuestion,
    editFeedbackQuestion,
    deleteFeedbackQuestion,
    deleteAllFeedbackQuestion
}