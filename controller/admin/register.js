var express = require('express');
var router = express.Router();
const mongoConection = require('../../utilities/connection');
const constants = require('../../utilities/constant');
const userModel = require('../../models/user.model');
exports.saveuser = async (req, res) => {
    let primary = mongoConection.useDb(constants.defaultDb);
    let obj = { 
      username :req.body.username,
      email : req.body.email,
      fullname : req.body.fullname,
      password : req.body.password
    };
    let newuser = await primary.model(constants.Model.demo, userModel).create(obj);
    res.status(200).json({
      message : 'User added successfully...',
      Data : newuser
    });
}

