const express = require('express');
const router = express.Router();
const commentSchema = require('../controllers/commentController');

router.get('/',commentSchema.getAllComment)
router.get('/:id',commentSchema.getCommentFromLesson)

router.post('/',commentSchema.addComment)

module.exports = router