var mongoose = require('mongoose');
var userSchema = require('./user.schema.server')

var userModel = mongoose.model('UserModel',userSchema);

function createUser(user){
    return userModel.create(user);
}

function findAll(){
    return userModel.find();
}

function findUserByCredentials(credentials){
    return userModel.findOne(credentials,{username:1})
}



var api={
    createUser:createUser,
    findAll:findAll,
    findUserByCredentials:findUserByCredentials,
}

module.exports=api;