
const AssessmentCategory = require('../models/assessmentcategorymodal');
const asyncWrapper = require('../middleware/async')
const jwt = require('jsonwebtoken')

const getAllAssessmentCategory = asyncWrapper(async (req, res) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ msg: 'Unauthorize user' })
        }
        else {
            const authToken = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
            const AssessmentCategories = await AssessmentCategory.find({})
            res.status(200).json({ AssessmentCategories })
        }
    } catch (error) {
        res.status(500).json({ msg: "Token has been expired" });
    }

})

const addAssessmentCategory = asyncWrapper(async (req, res) => {
    try {
        const { assessmentcategoryName } = req.body
        if (assessmentcategoryName === "") {
            res.status(400).json({ msg: "Please enter category name" })
        }
        else {
            const assessmentCategory = await AssessmentCategory.create(req.body)
            res.status(201).json({ assessmentCategory, msg: "Assessment Category Added successfully" })
        }
    } catch (error) {
        res.status(400).json({ msg: "Assessment Category already exists" })
    }
})

const deleteAssessmentCategory = asyncWrapper(async (req, res) => {
    const { id: assessmentcategoryID } = req.params
    const assessmentCategory = await AssessmentCategory.findOneAndDelete({ _id: assessmentcategoryID })
    try {
        if (!assessmentCategory) {
            res.status(400).json({ msg: `No assessment found with id: ${assessmentcategoryID}` })
        }
        else {
            res.status(200).json({ msg: "Assessment Category Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid assessment category id" })
    }
})


module.exports = {
    getAllAssessmentCategory,
    addAssessmentCategory,
    deleteAssessmentCategory
}