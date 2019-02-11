const User = require('../../models/user');


function registerUser(req, res){
    console.log("User");
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lasname;
    let password = req.body.password;
    let type = req.body.type;

    models.User.build({ 
        password: password,
        first_name: firstname,
        last_name: lastname,
        email: email,
        type: type
    })
      .save()
      .catch(error => {
        console.log('uh oh something wasnt right!');
        console.log(error);
        // Ooops, do some error-handling
      })
      res.send("User was registered");

}

module.exports = {
    registerUser: registerUser
};