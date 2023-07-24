
const Payment = require('../models/paymentmodal');
const Expense = require('../models/expensemodal');
// const Expense = require('../models/newexpensemodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllPayments = asyncWrapper(async (req, res) => {
    const Payments = await Payment.find({}).sort({id: -1})
    const Expenses = await Expense.find({}).sort({createdAt: -1})
    res.status(200).json({ Payments , Expenses})
    }
)

const createPayment = asyncWrapper(async (req, res) => {
    try {
        const payment = await Payment.create(req.body)
    if (!payment) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Payment Added successfully" })
    }
    } catch (error) {
        // res.status(400).json({ msg: error.errors })
        console.log(error);
    }  
})


module.exports = {
    getAllPayments,
    createPayment,
}