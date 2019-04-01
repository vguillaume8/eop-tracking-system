'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../configs/db');
const User = require('../../models/user');
const httpResponses = require('../responses/httpresponses');

// attemps to login user
function loginUser(req, res) { 
  let { email, password } = req.body;

  User.findOne({email: email}, function(error, user) {

    if (error){
      res.send(httpResponses.onCouldNotLogin)
    }

    // returns error if no user is found
    else if (!user) {
      return res.send(httpResponses.onUserNotFound);
    }

    // Check if password matches
    user.comparePassword(password, function(error, isMatch) {
      
      if (isMatch && !error) {
        
        var token = jwt.sign(user.toJSON(), db.secret, {
          expiresIn: 10080
        });
        
        return res.json({ success: true, token: token, user: user });
      }

      res.send(httpResponses.onAuthenticationFail);
    })
  })
}

module.exports = {
  login: loginUser
};