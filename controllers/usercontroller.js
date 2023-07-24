
const User = require('../models/usermodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllUsers = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Users = await User.find({}).sort({createdAt: -1})
    res.status(200).json({ Users })
    }
})

const addUser = asyncWrapper(async (req, res) => {
    try {
    const {email, password} = req.body
    if(email === "" || password === "")
    {
        res.status(400).json({ msg : "Please fill all the required fields"})
    }
    else {
        const user = await User.create(req.body)
        res.status(201).json({ msg: "User Added successfully", role: "user" })
    }
    } catch (error) {
        // res.status(400).json({ msg: "User already exists" })
        console.log(error);
    }
})

const deleteUser = asyncWrapper(async (req, res) => {
    const { id: userID } = req.params
    const user = await User.findOneAndDelete({ _id: userID })
    try {
        if (!user) {
            res.status(400).json({msg : `No user found with id: ${userID}`})
        }
        else {
            res.status(200).json({ msg: "User Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({msg : "Invalid id"})
    }
    
    
})


module.exports = {
    getAllUsers,
    addUser,
    deleteUser
}