'use strict';

const User = require('../models').User;

// create
exports.addUser = (data)=>{
  return User.create(data);
};

// get by id
exports.getUserById = (id) => {
  return User.findbyId(id).exec();
};

// get by name
exports.getUserByName = (name) => {
  return User.findOne({name: name}).exec();
};
