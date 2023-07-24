
const Category = require('../models/expensecategorymodal');
const asyncWrapper = require('../middleware/async')

const getAllExpenseCategory = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Categories = await Category.find({}).sort({createdAt: -1})
    res.status(200).json({ Categories })
    }
})

const addExpenseCategory = asyncWrapper(async (req, res) => {
    try {
    const {categoryName} = req.body
    if(categoryName === "")
    {
        res.status(400).json({ msg : "Please enter category name"})
    }
    else {
        const category = await Category.create(req.body)
        res.status(201).json({ category, msg: "Category Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Category already exists" })
    }
})

const deleteExpenseCategory = asyncWrapper(async (req, res) => {
    const { id: categoryID } = req.params
    const category = await Category.findOneAndDelete({ _id: categoryID })
    try {
        if (!category) {
            res.status(400).json({msg : `No batch found with id: ${categoryID}`})
        }
        else {
            res.status(200).json({ msg: "Category Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({msg : "Invalid category id"})
    }
})


module.exports = {
    getAllExpenseCategory,
    addExpenseCategory,
    deleteExpenseCategory
}