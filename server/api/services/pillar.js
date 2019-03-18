'use strict';
const Pillar = require('../../models/pillar');
const Description = require('../data/description');
const httpResponse = require('../responses/httpresponses');

function updatePillar(req, res){
    let newPillar = new Pillar(req.body);

    newPillar.findOneAndUpdate({student_id: req.params.userId}, function(err){
        if(err){
            res.send(httpResponse.onCouldNotSave);
        }
        
        else{
            res.send(httpResponse.onSaveSucess);
        }   
    })
    
}

function getPillar(req, res){
    let student_id = req.params.userId;

     Pillar.findOne({student_id: student_id}, function(err, pillar){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        else if(!pillar){
            res.send(httpResponse.onPillarNotFound);
        }else{
          
            let pillarPercentages = {
                SelfActulization: Object.values(pillar.SelfActulization).reduce(getSum) * 3.4482,
                Emotional: Object.values(pillar.Emotional).reduce(getSum) * 4,
                Community: Object.values(pillar.Community).reduce(getSum) * 5.8821,
                Intellectual: Object.values(pillar.Intellectual).reduce(getSum) * 4.762,
                Health: Object.values(pillar.Health).reduce(getSum) * 5.8821,
                ProfessionalAcademic: Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4,
            }
            
           
            
            res.send(pillarPercentages);
        }
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

function computePillarPercentages(pillar){

    return {
        SelfActulization: Object.values(pillar.SelfActulization).reduce(getSum) * 3.4482,
        Emotional: Object.values(pillar.Emotional).reduce(getSum) * 4,
        Community: Object.values(pillar.Community).reduce(getSum) * 6,
        Intellectual: Object.values(pillar.Intellectual).reduce(getSum) * 5,
        Health: Object.values(pillar.Health).reduce(getSum) * 6,
        ProfessionalAcademic: Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4,
    }
}

function getMetaPillar(req, res){
    let student_id = req.params.userId;

    Pillar.findOne({student_id: student_id}, function(err, pillar){
        
        if(err){
            res.send(httpResponse.onCouldNotRetreive);
        }

        else if(!pillar){
            res.send(httpResponse.onPillarNotFound);
        }
        
        else{
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
            
            res.json({success: true, metaArray: metaPillarArray, description: Description.getDescription(type)});
        }
    });
}

function increment(req, res){
   
    Pillar.findOne({student_id: req.params.userId}, function(err, pillar){

        if(err){
            res.send(httpResponse.onCouldNotUpdate);
        }
        
        else{
            let type = req.query.type;
            let meta = req.query.meta;
            let value = (pillar[type])[meta] + .1;
            value = Math.round(value * 100) / 100;

            if(value > 4){
                res.send(httpResponse.onMaxValue);
            }
            
            else{
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
        }
        
        else{
            let type = req.query.type;
            let meta = req.query.meta;
            let value = (pillar[type])[meta] - .1;
            value = Math.round(value * 100) / 100

            if(value < 0){
                res.send(httpResponse.onMinValue);
            }
            
            else{
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