/* eslint-disable */

function capitalize(firstname, lastname){
    return firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
}

function logout(){ 
    localStorage.removeItem('user');
}

module.exports = {
    capitalize: capitalize,
    logout: logout
}