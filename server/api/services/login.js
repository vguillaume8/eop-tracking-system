'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../configs/db');
const User = require('../../models/user');

const httpres = {
  onUserNotFound: {
    success: false,
    message: 'User not found.'
  },
  onAuthenticationFail: {
    success: false,
    message: 'Passwords did not match.'
  }
}

function loginUser(req, res) { 
  let { email, password } = req.body;
  User.findOne({
    email: email
  }, function(error, user) {
    if (error) throw error;

    if (!user) {
      return res.send(httpres.onUserNotFound);
    }

    // Check if password matches
     user.comparePassword(password, function(error, isMatch) {
      if (isMatch && !error) {
        var token = jwt.sign(user.toJSON(), db.secret, {
          expiresIn: 10080
        });
        return res.json({ success: true, token: 'JWT ' + token, user: user });
      }

      res.send(httpres.onAuthenticationFail);
    });
  });
};

module.exports = {
  login: loginUser
};