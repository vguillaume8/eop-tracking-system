'use-strict'
const fs = require('fs');
const fsExtra = require('fs-extra')
const csv = require('csv-parser');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Verify = require('../../models/user.verify');
const Util = require('../services/util/util');
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

async function uploadStudentData(req, res){

   

    if(!req.file){
        res.send(httpResponse.onNoFileUpload);
    } 

    else{
       
        let path = req.file.path;
        
        await fs.ReadStream(path)
            .pipe(csv())
            .on('data', function(data){
                try {
                    if(data.BANNER_ID && data.EMAIL && data.FIRST_NAME && data.LAST_NAME && data.CLASS){



                        // creates user object with request body
                        let newUser = new User(Util.userCreate(data.BANNER_ID, data.FIRST_NAME, data.LAST_NAME, data.EMAIL, data.BANNER_ID, Util.convertYear(data.CLASS)));

                        // Attempt to save the user
                        newUser.save(error => {

                        if (error) {
                            
                        }
                        
                        else{

                            let newPillar = new Pillar(Util.pillarCreate(data.BANNER_ID));

                            newPillar.save(error => {

                            if (error) {
                                
                            }
                            
                            else{
                                
                            }

                            })
                        }

                        // Verify.find({n_id: data.BANNER_ID}, function(err, user){

                        //     if(err){
                                
                        //       //  res.send(httpResponse.onCouldNotUpload);
                                
                        //     }
        
                        //     else{
                        //         if(user.length == 0){
                                        
                        //             let new_verify = new Verify({n_id: data.BANNER_ID, email: data.EMAIL, firstname: data.FIRST_NAME, lastname: data.LAST_NAME, year: Util.convertYear(data.CLASS)})
        
                        //             new_verify.save(err => {
                        //                 if(err){
                        //                    throw err;
                        //                 }
                        //             })
                        //         }
                        //     }
                        // })
                    })
                }
            }
                catch(err) {
                //error handler
                    //res.send(httpResponse.onCouldNotUpload);
                    
                }
            })

            fs.unlink(path, (err) => {
                                    
                if (err) {
                    res.send(httpResponse.onCouldNotDeleteFile); 
                }

                else{
                    res.send(httpResponse.onUploadSuccess);
                }
            })
    }
}

function getAmountOfAdvisorStudents(req, res){

    User.count({advisor: req.params.advisorName}, function(err, count){

        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        else{
            res.json({success: true, count: count});
        }
    })
}

module.exports = {
    getData: getData,
    search: search,
    uploadStudentData: uploadStudentData,
    getAmountOfAdvisorStudents: getAmountOfAdvisorStudents
}