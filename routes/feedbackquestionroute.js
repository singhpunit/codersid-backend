const express = require('express');
const router = express.Router()
const {getAllFeedbackQuestions, createFeedbackQuestion, editFeedbackQuestion, deleteFeedbackQuestion, deleteAllFeedbackQuestion} = 
require('../controllers/feedbackquestioncontroller')

router.route('/').get(getAllFeedbackQuestions).post(createFeedbackQuestion);
router.route('/:id').delete(deleteFeedbackQuestion).patch(editFeedbackQuestion)
router.route('/').delete(deleteAllFeedbackQuestion)

module.exports = router;