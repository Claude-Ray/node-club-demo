'use strict';

const Topic = require('../models').Topic;
const cache = require('co-cache')({
  expire: 10000
});

// create
exports.addTopic = (data) => {
  return Topic.create(data);
};

// get by id
exports.getTopicById = (id) => {
  return Topic.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec();
};

// get by tab
exports.getTopicsByTab = cache(function getTopicsByTab(tab, p) {
  let query = {};
  if (tab) {
    query.tab = tab;
  }
  return Topic.find(query).skip((p - 1) * 10).sort('updated_at').limit(10).select('-content').exec();
}, {
  key: (tab, p) => {
    tab = tab || 'all';
    return this.name + ':' + tab + ':' + p;
  }
});

// get by username
exports.getTopicsByName = (name) => {
  return Topic.find({'user.name': name}).sort('-updated_at').exec();
};

// get no-reply
exports.getNoReplyTopics = cache(function getNoReplyTopics() {
  return Topic.find({comment: 0}).sort('-updated_at').limit(5).select('title').exec();
});

// get count
exports.getTopicsCount = cache(function getTopicsCount(tab) {
  let query = {};
  if (tab) {
    query.tab = tab;
  }
  return Topic.count(query).exec();
}, {
  key: (tab) => {
    tab = tab || 'all';
    return this.name + ':' + tab;
  }
});

// increase comments
exports.incCommentsById = (id) => {
  return Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
};
