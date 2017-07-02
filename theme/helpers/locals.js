'use strict';

const app = require('../package');

module.exports = {
  get $app() {
    return app;
  }
};
