const { Schema, model } = require('mongoose');
const ObjectIdType = Schema.Types.ObjectId;

module.exports = model(
  'Comment',
  new Schema(
    {
      // User profile on which the comment is posted
      pageId: { type: ObjectIdType, ref: 'User', required: true },
      // Author of the comment
      userId: { type: ObjectIdType, ref: 'User', required: true },
      content: { type: String, required: true, trim: true },
    },
    { timestamps: true },
  ),
);
