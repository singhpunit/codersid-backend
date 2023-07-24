const express = require('express');
const router = express.Router()
const {getAllBatches, addBatch, deleteBatch} = require('../controllers/batchcontroller')

router.route('/').get(getAllBatches).post(addBatch);
router.route('/:id').delete(deleteBatch)

module.exports = router;