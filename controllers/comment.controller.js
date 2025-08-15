const db = require('../models');
const Comment = db.comment;
const User = db.user;

exports.listByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const comments = await Comment.find({ pageId: userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');
    res.json(comments);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

exports.create = async (req, res) => {
  try {
    const { userId } = req.params; // page owner id
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const comment = await Comment.create({
      pageId: userId,
      userId: req.user.id,
      content: content.trim(),
    });
    const populated = await comment.populate('userId', 'name');
    res.status(201).json(populated);
  } catch (e) {
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    // Author or admin can delete
    if (String(comment.userId) !== String(req.user.id)) {
      // fetch user role since tokens contain only id
      const me = await User.findById(req.user.id).select('role');
      if (!me || me.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
      }
    }

    await comment.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
