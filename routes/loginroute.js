const express = require('express')
const router = express.Router()
const { login } = require('../controllers/logincontroller')

router.route('/').post(login)

module.exports = router
