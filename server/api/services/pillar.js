'use strict';
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Description = require('../data/description');


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
    onDataSucess: {
        success: true
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

function getLevel(percent){

    if(percent < 25){
        return 'Beginner'
    }
    if(percent < 50){
        return 'Developing'
    }
    if(percent < 75){
        return 'Accomplished'
    }
    if(percent <= 100){
        return 'Exemplary'
    }
}

function getMetaPillar(req, res){
    let student_id = req.params.userId;
     Pillar.findOne({student_id: student_id}, function(err, pillar){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        if(!pillar){
            res.send(httpResponse.onPillarNotFound);
        }else{
            console.log("Ran");
            let type = req.query.type;
           // console.log(type);
            let metaPillar = pillar[type];
            let metaPillarArray = [];
            let pillarNames = Object.keys(metaPillar);
            let pillarValues = Object.values(metaPillar);
            console.log(pillarNames[1]);
            console.log(pillarValues[1]);

            for(var i = 1; i < pillarNames.length; i++){
                metaPillarArray.push({
                    variant: pillarNames[i],
                    value: pillarValues[i] * 25,
                    level: getLevel(pillarValues[i] * 25)
                })
            }
           // console.log(metaPillar);
            res.json({success: true, metaArray: metaPillarArray,
                      description: Description.getDescription(type)
            });
        }
      
        
        
        //res.send(pillar);
    });

}




module.exports = {
    updatePillar: updatePillar,
    getPillar: getPillar,
    getMetaPillar: getMetaPillar
};