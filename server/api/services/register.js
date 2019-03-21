const Util = require('./util/util');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Verify = require('../../models/user.verify');
const httpResponses = require('../responses/httpresponses');

// Register new users
function registerUser(request, response) {
  
  let { n_id, firstname, lastname, email, password } = request.body;

  // if there is no valid email or password
  if (!email || !password) {
    response.json(httpResponses.onValidationError);
  }else {

    // Check if this is a verified user
    Verify.findOne({n_id: n_id}, function(err, user){

      if(err){
       response.json(httpResponses.onCouldNotRegister);
      }
    
      // If there if the user is not a verified user
      else if(!user){
        response.json(httpResponses.onNotActiveUser);
      }
      
      // if the user email does not match the verfied email
      else if(user.email != email){
        response.json(httpResponses.onNotActiveUser);
      }
      
      else{
       
        // creates user object with request body
        let newUser = new User(Util.userCreate(n_id, firstname, lastname, email, password));

        // Attempt to save the user
        newUser.save(error => {

          if (error) {
            return response.json(httpResponses.onUserSaveError);
          }
          
          else{

            let newPillar = new Pillar(Util.pillarCreate(n_id));

            newPillar.save(error => {

              if (error) {
                return response.json(httpResponses.onCouldNotRegister);
              }
              
              else{
                response.json(httpResponses.onUserSaveSuccess);
              }

            })
          }
        })
      }
    })
  }
}

module.exports = {
  register: registerUser
};