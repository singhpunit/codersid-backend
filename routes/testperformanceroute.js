const express = require('express');
const router = express.Router()
const {getAllTestPerformance, addTestPerformance, deleteTestPerformance, 
    deleteAllTestPerformance} = require('../controllers/testperformancecontroller')

router.route('/').get(getAllTestPerformance).post(addTestPerformance).delete(deleteAllTestPerformance);
router.route('/:id').delete(deleteTestPerformance)

module.exports = router;