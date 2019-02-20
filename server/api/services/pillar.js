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
    },
    onCouldNotUpdate: {
        success: false,
        message: "Could not update"
    },
    onMaxValue: {
        success: false,
        message: "Max Value exceeded"
    },
    onMinValue: {
        success: false,
        message: "Min Value exceeded"
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
          
            let pillarPercentages = {
                SelfActulization: Object.values(pillar.SelfActulization).reduce(getSum) * 4,
                Emotional: Object.values(pillar.Emotional).reduce(getSum) * 4,
                Community: Object.values(pillar.Community).reduce(getSum) * 6,
                Intellectual: Object.values(pillar.Intellectual).reduce(getSum) * 5,
                Health: Object.values(pillar.Health).reduce(getSum) * 6,
                ProfessionalAcademic: Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4,
            }
            
           
            
            res.send(pillarPercentages);
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

function getVariant(percent){

    if(percent < 25){
        return 'danger'
    }
    if(percent < 50){
        return 'warning'
    }
    if(percent < 75){
        return 'info'
    }
    if(percent <= 100){
        return 'success'
    }
}

function getSum(total, num) {
    return total + num;
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
            let type = req.query.type;
            let metaPillar = pillar[type];
            let metaPillarArray = [];
            let pillarNames = Object.keys(metaPillar);
            let pillarValues = Object.values(metaPillar);
            
            for(var i = 1; i < pillarNames.length; i++){
                metaPillarArray.push({
                    name: pillarNames[i],
                    value: pillarValues[i] * 25,
                    level: getLevel(pillarValues[i] * 25),
                    variant: getVariant(pillarValues[i] * 25)
                })
            }
            console.log('Ran');
            res.json({success: true, metaArray: metaPillarArray,
                      //description: Description.getDescription(type)
            });
        }
      
        
        
        //res.send(pillar);
    });

}

function increment(req, res){
   
    Pillar.findOne({student_id: req.params.userId}, function(err, pillar){
        if(err){
            res.send(httpResponse.onCouldNotUpdate);
        }else{
            let type = req.query.type;
            let meta = req.query.meta;
            let value = (pillar[type])[meta] + .1;
            value = Math.round(value * 100) / 100;
            if(value > 4){
                res.send(httpResponse.onMaxValue);
            }else{
                let data = {[`${type}.${meta}`]: value};
            
                Pillar.findOneAndUpdate({student_id: req.params.userId}, data, function(err, pillar){
                    if(err){
                        res.send(httpResponse.onCouldNotUpdate);
                    }else{
                        res.send(httpResponse.onSaveSucess);
                    }
                })
            }
            
        }
    })
}


function decrement(req, res){
   
    Pillar.findOne({student_id: req.params.userId}, function(err, pillar){
        if(err){
            res.send(httpResponse.onCouldNotUpdate);
        }else{
            let type = req.query.type;
            let meta = req.query.meta;
            let value = (pillar[type])[meta] - .1;
            value = Math.round(value * 100) / 100
            if(value < 0){
                res.send(httpResponse.onMinValue);
            }else{
                let data = {[`${type}.${meta}`]: value};
            
                Pillar.findOneAndUpdate({student_id: req.params.userId}, data, function(err, pillar){
                    if(err){
                        res.send(httpResponse.onCouldNotUpdate);
                    }else{
                        res.send(httpResponse.onSaveSucess);
                    }
                })
            }
            
        }
    })
}




module.exports = {
    updatePillar: updatePillar,
    getPillar: getPillar,
    getMetaPillar: getMetaPillar,
    increment: increment,
    decrement: decrement
};