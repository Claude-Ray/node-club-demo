'use strict';

const Models = require('../lib/core');
const $Topic = Models.$Topic;

exports.get = function*() {
  let tab = this.query.tab;
  let p = this.query.p || 1;

  yield this.render('index', {
    topics: $Topic.getTopicsByTab(tab, p)
  });
};
