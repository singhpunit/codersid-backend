
const Course = require('../models/coursemodal');
const asyncWrapper = require('../middleware/async')

const getAllCourses = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Courses = await Course.find({}).sort({createdAt: -1})
    res.status(200).json({ Courses })
    }
})

const addCourse = asyncWrapper(async (req, res) => {
    console.log(req.body)
    try {
    const {courseName} = req.body
    if(courseName === "")
    {
        res.status(400).json({ msg : "Please enter course name"})
    }
    else {
        const course = await Course.create(req.body)
        res.status(201).json({ course, msg: "Course Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Course already exists" })
    }
})

const deleteCourse = asyncWrapper(async (req, res) => {
    const { id: courseID } = req.params
    const course = await Course.findOneAndDelete({ _id: courseID })
    try {
        if (!course) {
            res.status(400).json({msg : `No batch found with id: ${courseID}`})
        }
        else {
            res.status(200).json({ msg: "Course Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({msg : "Invalid course id"})
    }
})


module.exports = {
    getAllCourses,
    addCourse,
    deleteCourse
}