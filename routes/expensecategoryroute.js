const express = require('express');
const router = express.Router()
const {getAllExpenseCategory, addExpenseCategory, deleteExpenseCategory} = require('../controllers/expensecategorycontroller')

router.route('/').get(getAllExpenseCategory).post(addExpenseCategory);
router.route('/:id').delete(deleteExpenseCategory)

module.exports = router;