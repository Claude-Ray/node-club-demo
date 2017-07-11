'use strict';

const User = require('./user');
const Topic = require('./topic');
const Comment = require('./comment');

module.exports = ({
  get $User() {
    return User;
  },

  get $Topic() {
    return Topic;
  },

  get $Comment() {
    return Comment;
  }
});