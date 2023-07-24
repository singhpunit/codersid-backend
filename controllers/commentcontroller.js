
const Comment = require('../models/commentmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllComments = asyncWrapper(async (req, res) => {
        const Comments = await Comment.find({}).sort({ id: -1 })
        res.status(200).json({ Comments })
})

const addComment = asyncWrapper(async (req, res) => {
    try {
        const Comments = await Comment.find({})
        const length = Comments.length;
        let newComment = {
            ...req.body,
            id: length + 1
        }
        const comment = await Comment.create(newComment)
    if (!comment) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Comment Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Comment Already Exists" })
    }  
})

const editComment = asyncWrapper(async (req, res, next) => {
    const { id: commentID } = req.params
    const comment = await Comment.findOneAndUpdate({ _id: commentID }, req.body,{
        new: true,
        runValidators: true,
    })
    if (!comment) {
        return next(createCustomError(`No Comment with id : ${commentID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Comment Updated Successfully" })
    }
})

const deleteComment = asyncWrapper(async (req, res) => {
    const { id: commentID } = req.params
    const comment = await Comment.findOneAndDelete({ _id: commentID })
    try {
        if (!comment) {
            res.status(400).json({ msg: `No Comment found with id: ${commentID}` })
        }
        else {
            res.status(200).json({ msg: "Comment Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Comment id" })
    }
})


module.exports = {
    getAllComments,
    addComment,
    editComment,
    deleteComment
}