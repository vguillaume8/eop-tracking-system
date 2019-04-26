'use-strict'

const express = require('express');
const commentService = require('../services/comment');

const router = express.Router();

router.post('/', commentService.postComment);
router.get('/:userId', commentService.getComments);
router.delete('/:commentId', commentService.deleteComment);

module.exports = router;
