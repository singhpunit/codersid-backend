
const Lead = require('../models/leadsmodal');
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')

const getAllLeads = asyncWrapper(async (req, res) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
        res.status(401).json({ msg: 'Unauthorize user' })
    }
    else {
        const Leads = await Lead.find({}).sort({ id: -1 })
        res.status(200).json({ Leads })
    }
})

const addLead = asyncWrapper(async (req, res) => {
    try {
        const Leads = await Lead.find({})
        const length = Leads.length;
        let newLead = {
            ...req.body,
            id: length + 1
        }
        const lead = await Lead.create(newLead)
    if (!lead) {
        return next(createCustomError(`Please fill all the required fields`, 500))
    }
    else {
        res.status(201).json({ msg: "Lead Added successfully" })
    }
    } catch (error) {
        res.status(400).json({ msg: "Lead Already Exists" })
    }  
})

const editLead = asyncWrapper(async (req, res, next) => {
    const { id: leadID } = req.params
    const lead = await Lead.findOneAndUpdate({ _id: leadID }, req.body, {
        new: true,
        runValidators: true,
    })
    if (!lead) {
        return next(createCustomError(`No Lead with id : ${leadID}`, 400))
    }
    else {
        res.status(200).json({ msg: "Lead Updated Successfully" })
    }
})

const deleteLead = asyncWrapper(async (req, res) => {
    const { id: leadID } = req.params
    const lead = await Lead.findOneAndDelete({ _id: leadID })
    try {
        if (!lead) {
            res.status(400).json({ msg: `No Lead found with id: ${leadID}` })
        }
        else {
            res.status(200).json({ msg: "Lead Deleted Successfully" })
        }
    } catch (error) {
        res.status(500).json({ msg: "Invalid Lead id" })
    }
})


module.exports = {
    getAllLeads,
    addLead,
    editLead,
    deleteLead
}