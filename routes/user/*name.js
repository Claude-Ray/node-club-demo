'use strict';

const Models = require('../../lib/core');
const $Topic = Models.$Topic;

exports.get = function*(name) {
  yield this.render('user', {
    topics: $Topic.getTopicsByName(name),
    name  : name
  });
};