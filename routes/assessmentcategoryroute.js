const express = require('express');
const router = express.Router()
const {getAllAssessmentCategory, addAssessmentCategory, deleteAssessmentCategory} = require('../controllers/assessmentcategorycontroller')

router.route('/').get(getAllAssessmentCategory).post(addAssessmentCategory);
router.route('/:id').delete(deleteAssessmentCategory)

module.exports = router;