'use strict';
const bcrypt = require('bcrypt');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Comment = require('../../models/comment');
const httpResponse = require('../responses/httpresponses');

function updateUser(req, res){
    
    let user_id = req.params.userId;
    let userData = req.body;
    let password = userData.password;

    bcrypt.genSalt(10, (err, salt) => {

        if (err) {
            res.send(httpResponse.onCouldNotUpdate);
        }

        else{

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    res.send(httpResponse.onCouldNotUpdate);
                }

                else{

                    userData.password = hash;

                    User.findOneAndUpdate({n_id: user_id}, userData, {new: true}, function(err, user){
                    
                        if(err){
                            res.json(httpResponse.onCouldNotUpdate);
                        }
                        
                        else{
                            res.json({success:true, user:user})
                        }
                    })
                }
            })
        }
    })
}

function retrieveUser(req, res){

    let user_id = req.params.userId;

    User.findOne({n_id: user_id}, function(err, user){

        if(err){
            res.send(httpResponse.onUserNotFound);
        }
        
        else{
            res.json(user);
        }
    })
}

function getUsers(req, res){

    var usersProtection = {__v: false,  password: false };

    User.find({}, usersProtection, function(err, users){

        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }
        
        else{
            res.send(users);
        }
    })
}

function changeRole(req, res){

    User.findOneAndUpdate({n_id: req.params.userId}, req.body, function(err){
        if(err){
            res.send(httpResponse.onCouldNotUpdate);
        } 

        else{
            res.send(httpResponse.onSaveSucess);
        }
    })
}

function deleteUser(req, res){

    User.findOneAndDelete({n_id: req.params.userId}, function(err){

        if(err){
            res.send(httpResponse.onCouldNotDeleteStudent);
        }
        
        else{
            Pillar.findOneAndDelete({n_id: req.params.userId}, function(err){
                
                if(err){
                    res.send(httpResponse.onCouldNotDeleteStudent);
                } 

                else{
                    Comment.deleteMany({n_id: req.params.userId}, function(err){
                        
                        if(err){
                            res.send(httpResponse.onCouldNotDeleteStudent);
                        } 

                        else{
                            res.send(httpResponse.onSaveSucess);
                        }
                    })
                }
            })
        }
    })
}



module.exports = {
    retrieve: retrieveUser,
    getUsers: getUsers,
    changeRole: changeRole,
    updateUser: updateUser,
    deleteUser: deleteUser
};