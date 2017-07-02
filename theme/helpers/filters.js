'use strict';

const gravatar = require('gravatar');
const moment = require('moment');
const md = require('markdown-it');
const pkg = require('../package');

moment.locale(pkg.locale);

module.exports({
  get fromNow() {
    return (data) => {
      return moment(data).fromNow();
    };
  },

  get gravatar() {
    return gravatar.url;
  },

  get markdown() {
    return (content) => {
      return md.render(content);
    };
  }
});
