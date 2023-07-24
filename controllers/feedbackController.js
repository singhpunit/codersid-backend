const Feedback = require('../models/feedbackModal')
const FeedbackCategory = require('../models/feedbackCategory')
const asyncWrapper = require('../middleware/async')
const {ObjectId } = require('mongodb');

module.exports = {
    createFeedback: asyncWrapper(async (req, res) => {
        try {
            const feedback = await Feedback.create(req.body)
            if (!feedback) {
                return next(createCustomError(`Please fill all the required fields`, 500))
            }
            else {
                res.status(201).json({ msg: "feedback Added successfully" })
            }
        } catch (error) {
            res.status(400).json({ msg: "feedback Already Exists" })
        }
    }),

    deleteFeedback: asyncWrapper(async (req, res) => {
        const { id: feedbackID } = req.params
        const feedback = await Feedback.findOneAndDelete({ _id: feedbackID })
        try {
            if (!feedback) {
                res.status(400).json({ msg: `No Feedback found with id: ${feedbackID}` })
            }
            else {
                res.status(200).json({ msg: "Feedback Deleted Successfully" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Invalid feedback id" })
        }
    }),

    getSingleFeedback: asyncWrapper(async (req, res) => {
        try {
            const feedback = await Feedback.findOne({ _id: req.params.id })
            res.json({ id: feedback })
        }
        catch {
            res.status(500).json("something went wrong")
        }
    }),

    getAllFeedback: asyncWrapper(async (req, res) => {
        try {
            const feedback = await Feedback.find()
            res.status(200).json(feedback)
        }
        catch {
            res.status(500).json("something went wrong")
        }
    }),

    updateFeedback: asyncWrapper(async (req, res) => {
        const { id: feedbackID } = req.params
        const feedback = await Feedback.findOneAndUpdate({ _id: feedbackID },
            req.body, {
            new: true,
            runValidators: true,
        })
        try {
            if (!feedback) {
                res.status(400).json({ msg: `No feedback found with id: ${feedbackID}` })
            }
            else {
                res.status(200).json({ msg: "Feedback Updated Successfully" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Invalid feedback id" })
        }
    }),

    updateFeedbackQuestion: asyncWrapper(async (req, res) => {
        const { id: feedbackID } = req.params
        const feedback = await Feedback.findOneAndUpdate(
            { 'questionslist._id': feedbackID },
            { $set: { 'questionslist.$': req.body } },
            {
                new: true,
                runValidators: true,
            })
        try {
            if (!feedback) {
                res.status(400).json({ msg: `No feedback found with id: ${feedbackID}` })
            }
            else {
                res.status(200).json({ msg: "Feedback Updated Successfully" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Invalid feedback id" })
        }
    })
    ,
    createFeedbackCategory: asyncWrapper(async (req, res) => {
        try {
            const feedbackCategory = await FeedbackCategory.create(req.body)
            if (!feedbackCategory) {
                return next(createCustomError(`Please fill all the required fields`, 500))
            }
            else {
                res.status(201).json({ msg: "feedback Added successfully" })
            }
        } catch (error) {
            res.status(400).json({ msg: "feedback Already Exists" })
        }
    }),

    getAllFeedbackCategory: asyncWrapper(async (req, res) => {
        try {
            const category = await FeedbackCategory.find().sort({ createdAt: -1 })
            res.status(200).json(category)
        }
        catch {
            res.status(500).json("something went wrong")
        }
    }),

    deleteFeedbackCategory: asyncWrapper(async (req, res) => {
        const { id: categoryID } = req.params
        const category = await FeedbackCategory.findOneAndDelete({ _id: categoryID })
        try {
            if (!category) {
                res.status(400).json({ msg: `No batch found with id: ${categoryID}` })
            }
            else {
                res.status(200).json({ msg: "Category Deleted Successfully" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Invalid category id" })
        }
    }),

    deleteFeedbackQuestion: asyncWrapper(async (req, res) => {
        const { id: feedbackID } = req.params
        const feedbackquestion = await Feedback.updateOne(
            { 'questionslist._id': feedbackID },
            { "$pull": {
                "questionslist": {
                    "_id": feedbackID
                }
            }}
            )
        try {
            if (!feedbackquestion) {
                res.status(400).json({ msg: `No Feedback Question found with id: ${feedbackID}` })
            }
            else {
                res.status(200).json({ msg: "Feedback Question Deleted Successfully" })
            }
        } catch (error) {
            res.status(500).json({ msg: "Invalid Feedback Question id" })
        }
    }),


    addNewFeedbackQuestion: asyncWrapper(async (req, res) => {
        const { id: feedbackID } = req.params
        const newObjectId = new ObjectId();
        const payload = {
            question: req.body.question,
            _id: newObjectId.toString(),
            id: req.body.id
        }
        const feedbackquestion = await Feedback.updateOne(
            {  _id: feedbackID },
            { "$push": {
                "questionslist": payload
            }}
            )
        try {
            if (!feedbackquestion) {
                return next(createCustomError(`Please fill all the required fields`, 500))
            }
            else {
                res.status(200).json({ msg: "Feedback Question Added Successfully" })
            }
        } catch (error) {
            res.status(400).json({ msg: "Feedback Question Already Exists" })
        }
    }),


}