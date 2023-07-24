const express = require('express');
const router = express.Router()
const {addAdmin} = require('../controllers/admincontroller')

router.route('/').get(addAdmin);

module.exports = router;