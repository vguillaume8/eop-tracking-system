'use strict';
const User = require('../../models/user');
const httpResponse = require('../responses/httpresponses');

function getStudents(req, res){
    
    User.find({n_id: req.params.userId}, function(err, user){
        if(err) res.send(httpResponse.onCouldNotRetrieve);
        res.json({success: true, students: user[0].students});
    })
}

function addStudent(req, res){
    
   User.findOneAndUpdate({n_id: req.body.id}, {advisor: req.query.name},{new: true}, function(err, user){
        if(err) res.send(httpResponse.onCouldNotAddStudent);

        else if(user != null){

            if(user.length < 1){
                res.send(httpResponse.onStudentDoesNotExist);
            }
            
            else{
                
                if(user.role != 'student'){
                    res.send(httpResponse.onNotAStudent);
                }
                
                else{
                    User.find({ n_id: req.params.userId}, function(err, user){
                        
                        if(err) res.send(httpResponse.onCouldNotAddStudent);
                        let students = user[0].students;
                 
                        if(!students.includes(req.body.id)){
                            
                            User.findOneAndUpdate({n_id: req.params.userId}, {$push: {students: req.body.id}}, function(err, user){
                                if(err){
                                     res.send(http.onCouldNotAddStudent);
                                 }
                                 
                                 else{
                                    res.send(httpResponse.onStudentAddSuccess);
                                 } 
                                 
                            })
                        }
                        
                        else{
                            res.send(httpResponse.onStudentAddSuccess);
                        }
                    })
                }
            }
        }
        
        else{
            res.send(httpResponse.onStudentDoesNotExist);
        }
    })
   
   
}

function deleteStudent(req, res){
    User.findOneAndUpdate({n_id: req.params.userId}, {$pull: {students: req.query.student}}, function(err, user){
        
        if(err){
            res.send(httpResponse.onCouldNotDeleteStudent);
        }
        
        else{
            User.findOneAndUpdate({n_id: req.query.student}, {advisor: "Not Assigned"}, function(err, user){
                
                if(err){
                  res.send(httpResponse.onCouldNotUnassign);
                }
                
                else{
                    res.send(httpResponse.onStudentDeleteSuccess);
                }
            })
            
        }
    })
}

function getAllAdvisors(req, res){

    User.find({role: 'advisor'}, function(err, advisors){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        else{
            res.json({success: true, advisors: advisors})
        }
    })
}

module.exports = {
    addStudent: addStudent,
    getStudents: getStudents,
    deleteStudent: deleteStudent,
    getAllAdvisors: getAllAdvisors
}