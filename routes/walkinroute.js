const express = require('express');
const router = express.Router()
const {getAllWalkIns, addWalkin} = require('../controllers/walkincontroller')

router.route('/').get(getAllWalkIns).post(addWalkin);

module.exports = router;