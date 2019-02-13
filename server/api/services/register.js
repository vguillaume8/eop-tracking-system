const User = require('../../models/user');

// http response messages to send to the clinet
const httpResponses = {
  onValidationError: {
    success: false,
    message: 'Please enter email and password.'
  },
  onUserSaveError: {
    success: false,
    message: 'That email address already exists.'
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user.'
  }
};

// Register new users
function registerUser(request, response) {
  let { n_id, firstname, lastname, email, password } = request.body;

  // if there is no valid email or password
  if (!email || !password) {
    response.json(httpResponses.onValidationError);
  }else {
    // creates user object with request body
    let newUser = new User({
      n_id: n_id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
  });
   // Attempt to save the user
   newUser.save(error => {
     if (error) {
        return response.json(httpResponses.onUserSaveError);
      }
      response.json(httpResponses.onUserSaveSuccess);
    });
  }
}

module.exports = {
  register: registerUser
};