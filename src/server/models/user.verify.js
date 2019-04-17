const mongoose = require('mongoose');

const UserVerifySchema = new mongoose.Schema({
  n_id: {
    type: String,
    unique: true,
    required: true
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  firstname: {
    type: String,
    lowercase: true,
    required: true
  },

  lastname: {
      type: String,
      lowercase: true,
      required: true
  },

  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },

  year: String

});

module.exports = mongoose.model('Verify', UserVerifySchema);