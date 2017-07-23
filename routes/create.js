'use strict';

const Model = require('../lib/core');
const $Topic = Models.$Topic;

exports.get = function* () {
  yield this.render('create');
};

exports.post = function*() {
  let data = this.request.body;
  data.user = this.session.user;
  let topic = yield $Topic.addTopic(data);

  this.flash = {success: '发布成功！'};
  this.redirect('/topic/' + topic._id);
};
