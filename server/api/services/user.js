'use strict';
const User = require('../../models/user');
const Pillar = require('../../models/pillar');


const httpResponse = {
    onUserNotFound: {
      success: false,
      message: 'User not found.'
    },
    onCouldNotRetreive: {
        success: false,
        message: 'Could not retreive data'
    },
    onPillarNotFound: {
        success: false,
        message: 'Pillars not found.'
    },
    onCouldNotSave: {
        success: false,
        message: 'Could Not Save'
    },
    onSaveSucess: {
        success: true,
        message: "Updated Successfully"
    },
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

function getPillar(req, res){
    let student_id = req.params.userId;
     Pillar.findOne({student_id: student_id}, function(err, pillar){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        if(!pillar){
            res.send(httpResponse.onPillarNotFound);
        }else{
            res.send(pillar);
        }
      
        
        
        //res.send(pillar);
    });
    
   
}

function retrieveUser(req, res){
    let user_id = req.params.userId;
    User.findOne({n_id: user_id}, function(err, user){

        if(err){
            res.send(httpResponse.onUserNotFound);
        }else{
            res.json(user);
        }
    });

};

function getUsers(req, res){
    var usersProtection = {__v: false,  password: false };

    User.find({}, usersProtection, function(err, users){
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        } 

        res.send(users);
    })
}

function changeRole(req, res){
     console.log(req.params.userId);
    let data = {role: req.params.role}
    User.findOneAndUpdate({n_id: req.params.userId}, req.body, function(err, user){
        if(err) res.send("error");
        res.send(httpResponse.onSaveSucess);
    })
    
}

module.exports = {
    retrieve: retrieveUser,
    updatePillar: updatePillar,
    getPillar: getPillar,
    getUsers: getUsers,
    changeRole: changeRole
};