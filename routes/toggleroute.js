const express = require('express');
const router = express.Router()
const {editToggle} = require('../controllers/togglecontroller')

router.route('/').patch(editToggle)

module.exports = router;