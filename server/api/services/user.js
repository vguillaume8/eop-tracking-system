'use strict';
const User = require('../../models/user');


const httpResponse = {
    onUserNotFound: {
      success: false,
      message: 'User not found.'
    }
};


function retrieveUser(req, res){
    let user_id = req.params.userId;
    User.findById(user_id, function(err, user){

        if(err){
            res.send(httpResponse.onUserNotFound);
        }else{
            res.json(user);
        }
    });

};


module.exports = {
    retrieve: retrieveUser
};