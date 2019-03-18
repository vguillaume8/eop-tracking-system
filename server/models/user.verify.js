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

});

module.exports = mongoose.model('Verify', UserVerifySchema);