
const Batch = require('../models/batchmodal');
const asyncWrapper = require('../middleware/async')

const getAllBatches = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;
    if(!authToken)
    {
        res.status(401).json({msg: 'Unauthorize user'})
    }
    else{
    const Batches = await Batch.find({})
    res.status(200).json({ Batches })
    }
})

const addBatch = asyncWrapper(async (req, res) => {
    try {
    const {batchName} = req.body
    if(batchName === "")
    {
        res.status(400).json({ msg : "Please enter batch name"})
    }
    else {
        const batch = await Batch.create(req.body)
        res.status(201).json({ batch, msg: "Batch Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Batch already exists" })
    }
})

const deleteBatch = asyncWrapper(async (req, res) => {
    const { id: batchID } = req.params
    const batch = await Batch.findOneAndDelete({ _id: batchID })
    try {
        if (!batch) {
            res.status(400).json({msg : `No batch found with id: ${batchID}`})
        }
        else {
            res.status(200).json({ msg: "Batch Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({msg : "Invalid batch id"})
    }
})


module.exports = {
    getAllBatches,
    addBatch,
    deleteBatch
}