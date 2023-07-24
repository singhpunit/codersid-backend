
const Expense = require('../models/expensemodal');
const asyncWrapper = require('../middleware/async')
const cloudinary = require('../cloudinary/cloudinary');

const getAllExpenses = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if (!authToken) {
        res.status(401).json({ msg: 'Unauthorize user' })
    }
    else {
        const Expenses = await Expense.find({}).sort({createdAt: -1})
        res.status(200).json({ Expenses })
    }
})


const addExpense = asyncWrapper(async (req, res) => {
    try {
        const expense = await Expense.create(req.body)
    if (!expense) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Expense Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Expense Already Exists" })
    }  
})


const editExpense = asyncWrapper(async (req, res, next) => {
    const { id: expenseID } = req.params
    const expense = await Expense.findOneAndUpdate({ _id: expenseID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!expense) {
        return next(createCustomError(`No Product with id : ${expenseID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Expense Updated Successfully" })
    }
})

// const addExpense= asyncWrapper(async (req, res) => {
//     console.log(req.body)
//     console.log(req.body.bill)
//     try {
//         var expensebody = new Expense({
//             categoryName: req.body.categoryName,
//             expenseName: req.body.expenseName,
//             vendor: req.body.vendor,
//             amount: req.body.amount,
//             bill: `/uploads/${req.file.filename}`
//         })

//         const expense = await expensebody.save();
//     if(!expense)
//     {
//         res.status(400).json({ msg : "Please fill all the fields"})
//     }
//     else {
//         res.status(201).json({ expense,  msg: "Expense Created successfully" })
//     }
//     } catch (error) {
//         console.log(error);
//     }
// })

// const addExpense = async (req, res) => {
//     const {categoryName, expenseName, vendor, amount, bill} = req.body;
//     try {
//         const result = await cloudinary.uploader.upload(bill, {
//             folder: "expenses",
//         })
//         const expense = await Expense.create({
//             categoryName,
//             expenseName,
//             vendor,
//             amount,
//             bill: {
//                 public_id: result.public_id,
//                 url: result.secure_url
//             }
//         });
//         res.status(201).json({
//             msg: "Expense Added Succesfully",
//             expense
//         })
//     } catch (error) {
//         // res.status(400).json({ msg: "Expense Already Exists" })
//         console.log(error);
       
//     }
// }


const deleteExpense = asyncWrapper(async (req, res) => {
    const { id: expenseID } = req.params
    const expense = await Expense.findOneAndDelete({ _id: expenseID })
    try {
        if (!expense) {
            res.status(400).json({ msg: `No batch found with id: ${expenseID}` })
        }
        else {
            res.status(200).json({ msg: "Expense Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid expense id" })
    }
})


module.exports = {
    getAllExpenses,
    addExpense,
    deleteExpense,
    editExpense
}