const express = require('express');
const router = express.Router()
const {getAllStudentFeedback, createStudentFeedback, deleteStudentFeedback, getSingleStudentFeedback} = 
require('../controllers/studentfeedbackController')

router.route('/').get(getAllStudentFeedback).post(createStudentFeedback);
router.route('/:id').get(getSingleStudentFeedback).delete(deleteStudentFeedback);

module.exports = router;