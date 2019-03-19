'use-strict'
const httpResponse = require('../responses/httpresponses');
const csv = require('express-csv');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const path = require('path');

function downloadFile(req, res){

    if(req.params.file == "pillar-word"){
        res.download(path.join(__dirname + '/static/pillar-word.zip'));
    }
    
    else if(req.params.file == 'pillar-img'){
        res.sendFile(path.join(__dirname + '/static/pillar-img.zip'));
    }
    
    else{
        res.send(httpResponse.onCouldNotRetreive);
    }
}

function downloadStudentAll(req, res){
    User.find({role: "student"}, function(err, students){

        if(err){
           
            res.send(httpResponse.onCouldNotRetreive);
        }

        else{
           // console.log(students[0]);
            let data = [];
            let columns = {
                index: 'index',
                n_id: 'id',
                firstname: 'First Name',
                lastname: 'Lastname',
                email: 'email',
                year: 'year',
                advisor: "Advisor"
            };

            Pillar.find({}, function(err, pillars){

                if(err){
                    res.send(httpResponse.onCouldNotRetreive);
                }

                else{
                    let currentPillar;
                    let pillarvalues;
                    data.push(['N-ID', 'First Name', 'Last Name', 'Email', 
                                'Year', 'Advisor', 'Self Actualization', 
                                'Emotional', 'Community', 'Intellectual',
                                'Health', 'Professional/Academic'
                            ]);

                    for (var i = 0; i < students.length ; i++) {
                        if(students[i] != null){
                         
                            for(var key in pillars){
                                if(pillars[key].student_id == students[i].n_id){
                                    currentPillar = pillars[key];
                                    pillarvalues = compute(currentPillar);
                                    console.log("values" + pillarvalues.SelfActulization);
                                    break;
                                }

                            }

                            if(pillarvalues != null){
                                data.push([students[i].n_id, students[i].firstname, students[i].lastname, 
                                    students[i].email, students[i].year, students[i].advisor, 
                                    pillarvalues.SelfActulization, pillarvalues.Emotional, pillarvalues.Community,
                                    pillarvalues.Intellectual, pillarvalues.Health, pillarvalues.ProfessionalAcademic 
                                ]);

                            }

                            else{
                                data.push([students[i].n_id, students[i].firstname, students[i].lastname, students[i].email, students[i].year, students[i].advisor]);

                            }
        
                            
                        }   
                       
                    }
                    
                    res.csv(data);
                }
            })

           
            
            
        }
    })
}

function compute(pillar){
   
    return {
        SelfActulization: Object.values(pillar.SelfActulization).reduce(getSum) * 3.4482,
        Emotional: Object.values(pillar.Emotional).reduce(getSum) * 4,
        Community: Object.values(pillar.Community).reduce(getSum) * 6,
        Intellectual: Object.values(pillar.Intellectual).reduce(getSum) * 5,
        Health: Object.values(pillar.Health).reduce(getSum) * 6,
        ProfessionalAcademic: Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4,
    }
    
}

function getSum(total, num) {
    return total + num;
}

module.exports = {
    downloadFile: downloadFile,
    downloadStudentAll: downloadStudentAll
}