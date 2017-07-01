'use strict';

const User = require('../models').User;
const Topic = require('../models').Topic;
const Comment = require('../models').Comment;

module.exports({
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