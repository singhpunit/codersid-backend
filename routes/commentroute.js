const express = require('express');
const router = express.Router()
const {getAllComments, addComment, editComment, deleteComment} = require('../controllers/commentcontroller')

router.route('/').get(getAllComments).post(addComment);
router.route('/:id').patch(editComment).delete(deleteComment);

module.exports = router;