'use strict';
const User = require('../../models/user');



const httpResponse = {
  onCouldNotAddStudent: {
      success: false,
      message: "Could not add student"
  },
  onStudentAddSuccess: {
      success: true,
      message: "Student was added successfully"
  },
  onStudentAlreadyExists: {
      success: false,
      message: "Student already exists in your list"
  },
  onStudentDoesNotExist: {
      success: false,
      message: "This student does not exist"
  },
  onCouldNotRetrieve: {
      success: false,
      message: "Could not retrieve data"
  },
  onCouldNotDeleteStudent: {
      success: false,
      message: "Could not delete student"
  },
  onStudentDeleteSuccess: {
      success: true,
      message: "Student was successfully deleted"
  }
};

function getStudents(req, res){
    User.find({n_id: req.params.userId}, function(err, user){
        if(err) res.send(httpResponse.onCouldNotRetrieve);
        res.json({success: true, students: user[0].students});
    })
}

function addStudent(req, res){

   User.find({n_id: req.body.id}, function(err, user){
        if(err) res.send(httpResponse.onCouldNotAddStudent);
        if(user.length < 1){
            res.send(httpResponse.onStudentDoesNotExist);
        }else{
            User.find({ n_id: req.params.userId}, function(err, user){
                if(err) res.send(httpResponse.onCouldNotAddStudent);
                let students = user[0].students;
         
                if(!students.includes(req.body.id)){
         
                     User.findOneAndUpdate({n_id: req.params.userId}, {$push: {students: req.body.id}}, function(err, user){
                         if(err){
                             res.send(http.onCouldNotAddStudent);
                         } 
                         res.send(httpResponse.onStudentAddSuccess);
                     });
                }else{
                    res.send(httpResponse.onStudentAlreadyExists);
                }
            })
        }
   })
   
   
};

function deleteStudent(req, res){
    console.log(req.query.student);
    User.findOneAndUpdate({n_id: req.params.userId}, {$pull: {students: req.query.student}}, function(err, user){
        if(err){
            res.send(httpResponse.onCouldNotDeleteStudent);
        }else{
            res.send(httpResponse.onStudentDeleteSuccess);
        }
    });
}

module.exports = {
    addStudent: addStudent,
    getStudents: getStudents,
    deleteStudent: deleteStudent
}