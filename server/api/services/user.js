'use strict';
const User = require('../../models/user');
const Pillar = require('../../models/pillar');


const httpResponse = {
    onUserNotFound: {
      success: false,
      message: 'User not found.'
    },
    onCouldNotSave: {
        success: false,
        message: 'Could Not Save'
    },
    onSaveSucess: {
        success: true,
        message: "Updated Successfully"
    }
};

function updatePillar(req, res){
    let newPillar = new Pillar(req.body);

    newPillar.findOneAndUpdate({student_id: req.params.userId}, function(err, pillar){
        if(err){
            res.send(httpResponse.onCouldNotSave);
        }

        res.send(httpResponse.onSaveSucess);
    })
    
}

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
    retrieve: retrieveUser,
    updatePillar: updatePillar
};