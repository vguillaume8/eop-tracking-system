const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  n_id: {
    type: String,
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

  password: {
    type: String,
    required: true
  },

  students: [String],
  year: String,
  bio: String,
  address: String,
  city: String,
  zip: String,
  state: String,
  advisor: {
    type: String,
    default: 'Not Assigned'
  },

  role: {
    type: String,
    enum: ['student', 'advisor', 'admin'],
    default: 'student'
  }

});


// Hashes passwords before saving to database
UserSchema.pre('save', function(next) {
  let user = this;

  if(this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return next(err);
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          return next(err);
        }

        user.password = hash;
        next();

      });

    });

  }else {
    return next();
  }

});

// Create method to compare password input to password saved in database
UserSchema.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if(err){
      return cb(err);
    }

    cb(null, isMatch);
    
  });
};

module.exports = mongoose.model('User', UserSchema);