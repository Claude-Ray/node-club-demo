'use strict';

const mongoose = require('mongoose');
const config = require('config-lite')(__dirname).mongodb;

mongoose.connect(config.url, (err) => {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
exports.Topic = require('./topic');
exports.Comment = require('./comment');
