'use strict';

const Models = require('../lib/core');
const $User = Models.$User;

exports.get = function*() {
  yield this.render('signin');
};

exports.post = function*() {
  let data = this.request.body;
  let userInfo = yield $User.getUserByName(data.name);
  if (!userInfo || (userInfo.password !== data.password)) {
    this.flash = {error: '用户名或密码错误！'};
    return this.redirect('back');
  }

  this.session.user = {
    name : userInfo.name,
    email: userInfo.email
  };

  this.flash = {success: '登录成功！'};
  this.redirect('/user/' + userInfo.name);
};


