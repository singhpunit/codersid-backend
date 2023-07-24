const express = require('express');
const multer = require('multer');
const expenseRoute = express();

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

// const upload = multer({ storage: storage});

const {getAllExpenses, addExpense, deleteExpense, editExpense} = require('../controllers/expensecontroller')
// router.route('/').get(getAllExpenses).post(addExpense);


expenseRoute.get('/', getAllExpenses);
expenseRoute.post('/', addExpense);
expenseRoute.patch('/:id', editExpense);
expenseRoute.delete('/:id', deleteExpense)
module.exports = expenseRoute;