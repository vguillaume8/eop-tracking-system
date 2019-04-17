function capitalize(firstname, lastname){
    return firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
}


function computePillarPercentages(pillar){

    return {
        SelfActulization: Math.round(Object.values(pillar.SelfActulization).reduce(getSum) * 3.4482),
        Emotional: Math.round(Object.values(pillar.Emotional).reduce(getSum) * 4),
        Community: Math.round(Object.values(pillar.Community).reduce(getSum) * 6),
        Intellectual: Math.round(Object.values(pillar.Intellectual).reduce(getSum) * 5),
        Health: Math.round(Object.values(pillar.Health).reduce(getSum) * 6),
        ProfessionalAcademic: Math.round(Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4),
    }
}



function getSum(total, num) {
    return total + num;
}



function getLevel(percent){

    if(percent < 25){
        return 'Beginner'
    }

    if(percent < 50){
        return 'Developing'
    }

    if(percent < 75){
        return 'Accomplished'
    }

    if(percent <= 100){
        return 'Exemplary'
    }
}

function getVariant(percent){

    if(percent < 25){
        return 'danger'
    }

    if(percent < 50){
        return 'warning'
    }

    if(percent < 75){
        return 'info'
    }

    if(percent <= 100){
        return 'success'
    }
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


function userCreate(n_id, firstname, lastname, email, password, year){
    return {
      n_id: n_id,
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      year: year
    };
  }


function convertYear(year){

  switch(year){

    case 'FR':
      return 'Freshman'
    case 'SO':
      return 'Sophmore'
    case 'JR':
      return 'Junior'
    case 'SR':
      return 'Senior'
    default:
      return 'Unknown'
  }
}


module.exports = {
    capitalize: capitalize,
    computePillarPercentages: computePillarPercentages,
    getLevel: getLevel,
    getVariant: getVariant,
    pillarCreate: pillarCreate,
    userCreate: userCreate,
    convertYear: convertYear

}