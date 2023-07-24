const express = require('express');
const router = express.Router()
const {getAllPayments, createPayment} = require('../controllers/paymentcontroller')

router.route('/').get(getAllPayments).post(createPayment);

module.exports = router;