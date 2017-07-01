'use strict';

const Comment = require('../models').Comment;

// add
exports.addComment = (data) => {
  return Comment.create(data);
};

// get by topic_id
exports.getCommentsByTopicId = (id) => {
  return Comment.find({topic_id: id}).sort('updated_at').exec();
};
