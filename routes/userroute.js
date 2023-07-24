const express = require('express');
const router = express.Router()
const {getAllUsers, addUser, deleteUser} = require('../controllers/usercontroller')

router.route('/').get(getAllUsers).post(addUser);
router.route('/:id').delete(deleteUser)

module.exports = router;