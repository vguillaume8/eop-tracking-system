'use-strict'
const User = require('../../models/user');
const httpResponse = require('../responses/httpresponses');

async function getData(req, res){
    let count = {};
    await User.count({}, function(err, count){
        
        count.all = count;

        User.count({role: "student"}, function(err, student){
            count.student = student;

             User.count({role: "advisor"}, function(err, advisor){
                
                User.count({role: "admin"}, function(err, admin){
                   
                    res.json({count: count, student: student, advisor: advisor, admin: admin});
                })
                
            })
        })
    
       
    })

    

    
}

function search(req, res){
    let search = req.params.search.toLowerCase();
    User.find({firstname: new RegExp(search)}, function(err, result){
        res.json({search: result});
    })
    
}



module.exports = {
    getData: getData,
    search: search
}