'use strict';
const Pillar = require('../../models/pillar');
const util = require('./util/util');
const Description = require('../data/description');
const httpResponse = require('../responses/httpresponses');

function updatePillar(req, res) {

    const newPillar = new Pillar(req.body);

    newPillar.findOneAndUpdate({student_id: req.params.userId}, function(err) {

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
        }

        else{

            let pillarPercentages = util.computePillarPercentages(pillar);

            res.send(pillarPercentages);
        }
    })
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
                    level: util.getLevel(pillarValues[i] * 25),
                    variant: util.getVariant(pillarValues[i] * 25)
                })
            }

            res.json({success: true, metaArray: metaPillarArray, description: Description.getDescription(type)});
        }
    })
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
