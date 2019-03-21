'use-strict'
const fs = require('fs');
const csv = require('csv-parser');
const User = require('../../models/user');
const Verify = require('../../models/user.verify');
const httpResponse = require('../responses/httpresponses');

async function getData(req, res){

    await User.count({}, function(err, count){
        
        User.count({role: "student"}, function(err, student){
    
            if(err){
                res.send(httpResponse.onCouldNotRetreive);
            }

            else{
                User.count({role: "advisor"}, function(err, advisor){
                    
                    if(err){
                        res.send(httpResponse.onCouldNotRetreive);
                    }
                    
                    else{
                        User.count({role: "admin"}, function(err, admin){
                            
                            if(err){
                                res.send(httpResponse.onCouldNotRetreive);
                            }

                            else{
                                res.json({count: count, student: student, advisor: advisor, admin: admin});
                            }
                        })
                    }    
                })
            }
        })
    })  
}

function search(req, res){
    let search = req.params.search.toLowerCase();

    User.find({firstname: new RegExp(search)}, function(err, result){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        else{
            res.json({search: result});
        }
    }) 
}

function uploadStudentData(req, res){

    if(!req.files[0]) res.send(httpResponse.onNoFileUpload);
    
    let path = req.files[0].path;

    fs.createReadStream(path)
        .pipe(csv())
        .on('data', function(data){
            try {
                Verify.find({n_id: data.StuId}, function(err, user){
                    
                    if(err){
                        res.send(httpResponse.onCouldNotUpload);
                    }
                    
                    else{
                        if(user.length == 1){
                            let new_verify = new Verify({n_id: data.StuId, email: data.CampEmail})

                            new_verify.save(err => {
                                if(err){
                                    res.send(httpResponse.onCouldNotUpload); 
                                }

                                else{
                                    fs.unlink(path, (err) => {
                                        if (err) {
                                         res.send(httpResponse.onCouldNotDeleteFile);   
                                        }
                                        
                                        else{
                                            res.send(httpResponse.onUploadSuccess);
                                        }
                                
                                    })
                                }
                            })
                        }
                    }
                }    
            )}

            catch(err) {
            //error handler
                res.send(httpResponse.onCouldNotUpload);
            }
        }
    )
}



module.exports = {
    getData: getData,
    search: search,
    uploadStudentData: uploadStudentData
}