const User = require('../../models/user');
const Pillar = require('../../models/pillar');

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


      let pillar = {
        student_id: n_id,
        SelfActulization: {
          Morals: 0.5,
          Perception: 0.5,
          Gratitude: 0.5,
          Happiness: 0.5,
          Social: 0.5,
          Other: 0.5 
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
      


      let newPillar = new Pillar(pillar);
      newPillar.save(error => {
        if (error) {
          return response.json(httpResponses.onUserSaveError);
        }
       });
      response.json(httpResponses.onUserSaveSuccess);
    });
  }
}

module.exports = {
  register: registerUser
};