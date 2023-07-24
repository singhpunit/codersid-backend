const express = require('express');
const router = express.Router()
const {getAllQuestions, createQuestion, editQuestion, deleteQuestion, deleteAllQuestion} = require('../controllers/questioncontroller')

router.route('/').get(getAllQuestions).post(createQuestion);
router.route('/:id').delete(deleteQuestion).patch(editQuestion)
router.route('/').delete(deleteAllQuestion)

module.exports = router;