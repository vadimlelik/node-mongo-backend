const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const { auth } = require('../middleware/auth.middleware');

// Public: list comments for a user profile
router.get('/users/:userId/comments', CommentController.listByUser);

// Auth required: add a comment to a user profile
router.post('/users/:userId/comments', auth, CommentController.create);

// Auth required: delete a comment by id (author or admin only)
router.delete('/comments/:id', auth, CommentController.remove);

module.exports = router;
