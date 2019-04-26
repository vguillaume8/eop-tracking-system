'use-strict'
const httpResponse = require('../responses/httpresponses');
const csv = require('express-csv');
const util = require('./util/util');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const path = require('path');

function downloadFile(req, res){

    if (req.params.file == "pillar-word") {
        res.download(path.join(__dirname + '/static/pillar-word.zip'));
    }

    else if(req.params.file == 'pillar-img') {
        res.sendFile(path.join(__dirname + '/static/pillar-img.zip'));
    }

    else{
        res.send(httpResponse.onCouldNotRetreive);
    }
}

function downloadStudentAll(req, res){
    User.find({role: "student"}, function(err, students) {

        if (err) {

            res.send(httpResponse.onCouldNotRetreive);
        }

        else {
           // console.log(students[0]);
            let data = [];

            Pillar.find({}, function(err, pillars) {

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
                        ]
                    );

                    for (var i = 0; i < students.length ; i++) {

                        if(students[i] != null){

                            for(var key in pillars){
                                if(pillars[key].student_id == students[i].n_id){
                                    currentPillar = pillars[key];
                                    pillarvalues = util.computePillarPercentages(currentPillar);
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


module.exports = {
    downloadFile: downloadFile,
    downloadStudentAll: downloadStudentAll
}
