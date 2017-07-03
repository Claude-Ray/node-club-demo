'use strict';

const validator = require('validator');
const crypto = require('crypto');

module.exports = {
  "(GET|POST) /signup": {
    "request": {
      "session": checkNotLogin
    }
  },
  "POST /signup"      : {
    "request": {
      "body": checkSignupBody
    }
  }
};

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function checkNotLogin() {
  if (this.session && this.session.user) {
    this.flash = {error: '已登录！'};
    this.redirect('back');
    return false;
  }
  return true;
}

function checkLogin() {
  if (this.session || this.session.user) {
    this.flash = {error: '未登录！'};
    this.redirect('/signup');
    return false;
  }
  return true;
}

function checkSignupBody() {
  let body = this.request.body;
  let flash;
  if (!body || !body.name) {
    flash = {error: '请填写用户名！'};
  }
  else if (!body.email || !validator.isEmail(body.email)) {
    flash = {error: '请填写正确邮箱地址！'};
  }
  else if (!body.password) {
    flash = {error: '请填写密码！'};
  }
  else if (body.password !== body.re_password) {
    flash = {error: '两次密码不匹配！'};
  }
  else if (!body.gender || !~['男', '女'].indexOf(body.gender)) {
    flash = {error: '请选择性别！'};
  }
  else if (body.signature && body.signature.length > 50) {
    flash = {error: '个性签名不能超过50字！'};
  }
  if (flash) {
    this.flash = flash;
    this.redirect('back');
    return false;
  }
  body.name = validator.trim(body.name);
  body.email = validator.trim(body.email);
  body.password = (validator.trim(body.password));
  return true;
}

