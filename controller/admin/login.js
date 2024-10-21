var express = require('express');
var router = express.Router();
const mongoConection = require('../../utilities/connection');
const constants = require('../../utilities/constant');
const userModel = require('../../models/user.model');
const jwt = require('jsonwebtoken');
const helper = require('../../utilities/helper');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
exports.login = async (req, res) => {
    let primary = mongoConection.useDb(constants.defaultDb);
    let obj = { 
      email :req.body.email,
      password : req.body.password

    };

    try {
      // Find the user by username
      let userData = await primary.model(constants.Model.demo, userModel).findOne({ email: req.body.email , password : req.body.password });

      if (userData == null) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the password is correct
    //   const isMatch = await bcrypt.compare(obj.password, userData.password); // Corrected line
    //   if (!isMatch) {




        
    //       return res.status(401).json({ message: 'Invalid password' });
    //   }

      // Generate a JWT token
      let token = await helper.generateAccessToken({userId : userData._id.toString()});

      res.status(200).json({
          message: 'Login successful',
          token: token
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

