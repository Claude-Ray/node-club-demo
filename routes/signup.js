'use strict';

const Models = require('../lib/core');
const $Uesr = Models.$User;

exports.get = function*() {
  yield this.render('signup');
};

exports.post = function*() {
  let data = this.request.body;
  let userExist = yield $User.getUserByName(data.name);
  if (userExist) {
    this.flash = {error: '用户名已存在！'};
    return this.redirect('/');
  }

  yield $Uesr.addUser(data);

  this.session.user = {
    name : data.name,
    email: data.email
  };

  this.flash = {success: '注册成功！'};
  this.redirect('/');
};
