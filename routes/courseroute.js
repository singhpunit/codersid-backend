const express = require('express');
const router = express.Router()
const {getAllCourses, addCourse, deleteCourse} = require('../controllers/coursecontroller')

router.route('/').get(getAllCourses).post(addCourse);
router.route('/:id').delete(deleteCourse)

module.exports = router;