const express = require('express');
const router = express.Router()
const {getAllLeads, addLead, editLead, deleteLead} = require('../controllers/leadscontroller')

router.route('/').get(getAllLeads).post(addLead);
router.route('/:id').patch(editLead).delete(deleteLead);

module.exports = router;