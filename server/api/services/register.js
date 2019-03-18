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
        let newUser = userCreate(n_id, firstname, lastname, email, password);

        // Attempt to save the user
        newUser.save(error => {
          if (error) {
            return response.json(httpResponses.onUserSaveError);
          }else{

            let newPillar = new Pillar(pillarCreate(n_id));

            newPillar.save(error => {
              if (error) {
                return response.json(httpResponses.onCouldNotRegister);
              }
              
              else{
                response.json(httpResponses.onUserSaveSuccess);
              }
            });
          }
        });
      }
    })
  }
}

function userCreate(n_id, firstname, lastname, email, password){
  return new User({
    n_id: n_id,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: password
  });
}

function pillarCreate(n_id){
  // Create a pillar for the user
  return {
    student_id: n_id,
    SelfActulization: {
      Morals: 0.5,
      Perception: 0.5,
      Gratitude: 0.5,
      Happiness: 0.5,
      Social: 0.5,
      Autonomy: 0.5 ,
      Communication: 0.5
    },

    Emotional: {
      Attitude: 0.5,
      Feelings: 0.5,
      Empathy: 0.5,
      Coping: 0.5,
      Insight: 0.5,
      Management: 0.5
    },

    Community: {
      Physical: 0.5,
      Service: 0.5,
      Culture: 0.5,
      Social: 0.5
    },

    Intellectual: {
      Thinking: 0.5,
      Current: 0.5,
      Experiences: 0.5,
      Organization: 0.5,
      Learning: 0.5
    },

    Health: {
      Physical: 0.5,
      Nutritional: 0.5,
      Hygiene: 0.5,
      Sleep: 0.5 
    },

    ProfessionalAcademic: {
      Major: 0.5,
      Specialization: 0.5,
      Satisfaction: 0.5,
      Persona: 0.5,
      Ethic: 0.5,
      Skills: 0.5
    }

  }

}

  


module.exports = {
  register: registerUser
};