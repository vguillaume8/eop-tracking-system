'use-strict'
const httpResponses = require('../responses/httpresponses');
const PDFDocument = require('pdfkit');
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Comment = require('../../models/comment');
const util = require('./util/util');



function getReport(req, res){


    User.findOne({n_id: req.params.userId}, function(err, user){
        if(err){
            res.send(httpResponses.onCouldNotGenerate);
        }
        
        else{
            
            Pillar.findOne({student_id: req.params.userId}, function(err, pillar){
                
                if(err){
                    res.send(httpResponses.onCouldNotGenerate);
                }

                else{

                    Comment.find({n_id: req.params.userId}, function(err, comments){

                        if(err){
                            res.send(httpResponses.onCouldNotGenerate);
                        }

                        else{

                            if(pillar == null){
                                res.send(httpResponses.onNotAStudent);
                            }
                            
                            else{
                                
                                // Computes pillar percentages for student
                                let pillarPercentages = util.computePillarPercentages(pillar);
                                
                                // Lets the browser know that its receiving a pdf to download
                                res.setHeader('Content-type', 'application/pdf');
                                res.writeHead( 200, {
                                    'Content-Type': 'application/pdf',
                                    'Content-Disposition': `attachment; filename=${user.lastname+user.firstname}.pdf`
                                });
                        
                                // Creates a new document for writing
                                let doc = new PDFDocument()
                        
                        
                                // return object
                                doc.pipe(res);


                                // PDF Creation logic goes here
                        
                                // New Paltz Logo in top left corner
                                doc.image(__dirname + '/static/newpaltz_logo.png', 0, 0, {width: 150});
                                
                                
                                // Set a title and pass the X and Y coordinates
                                doc.moveDown();
                                doc.fontSize(20).text('Progress Report', {
                                    align: 'center'
                                });
                        
                                doc.moveDown().font('Times-Roman', 13);
                        
                                doc.text(`Student: ${util.capitalize(user.firstname, user.lastname)}`)
                                doc.text(`Advisor: ${user.advisor}`)
                                doc.text(`Last Meeting Date: ${comments[0].date}`, {
                                    width: 410,
                                    align: 'left'
                                })
                        
                                doc.moveDown();
                
                                doc.text(`Current PILLAR Progression: `, {
                                    width: 410,
                                    align: 'center'
                                })
                    
                                doc.moveDown();
                    
                                doc.text(`Professional/Academic: ${pillarPercentages.ProfessionalAcademic}%`, {
                                    width: 410,
                                    align: 'center'
                                })
                                doc.text(`Self Actualization: ${pillarPercentages.SelfActulization}%`, {
                                    width: 410,
                                    align: 'center'
                                })
                                doc.text(`Emotional: ${pillarPercentages.Emotional}%`, {
                                    width: 410,
                                    align: 'center'
                                })
                                doc.text(`Community: ${pillarPercentages.Community}%`, {
                                    width: 410,
                                    align: 'center'
                                })
                                doc.text(`Intellectual: ${pillarPercentages.Intellectual}%`, {
                                    width: 410,
                                    align: 'center'
                                })
                                doc.text(`Health: ${pillarPercentages.Health}%`, {
                                    width: 410,
                                    align: 'center'
                                })
            
                                doc.moveDown();
                                doc.text(`Advisor comments: `,{
                                    width: 410,
                                    align: 'left'
                                })
            
                                doc.moveDown();
            

                                // Loops through comments to add to report by recent ones first
                                for(var i = comments.length -1; i > -1; i-- ){
                                    if(comments[i] != null){

                                        doc.text(`${comments[i].date}: ${comments[i].comment}`, {
                                            width: 410,
                                            align: 'center'
                                        })
            
                                        doc.moveDown();
                                        
                                        doc.text('PILLARS OF DISCUSSION: ', {
                                            width: 410,
                                            align: 'center'
                                        });

                                        if(comments[i].selfact == true){
                                            doc.text("Self Actualization",{
                                                width: 410,
                                                align: 'center'
                                            })
                                        }

                                        if(comments[i].emotional == true){
                                            doc.text("Emotional", {
                                                width: 410,
                                                align: 'center'
                                            })
                                        }

                                        if(comments[i].community == true){
                                            doc.text("Community", {
                                                width: 410,
                                                align: 'center'
                                            })
                                        }

                                        if(comments[i].intellectual == true){
                                            doc.text("Intellectual", {
                                                width: 410,
                                                align: 'center'
                                            })
                                        }

                                        if(comments[i].health == true){
                                            doc.text("Health", {
                                                width: 410,
                                                align: 'center'
                                            })
                                        }

                                        if(comments[i].prof == true){
                                            doc.text("Professional/Academic", {
                                                width: 410,
                                                align: 'center'
                                            })
                                        }
                                    }
                                    
                                    // Line Break
                                    doc.text('------------------------------------------------------------------------------------------------------------')
                                   
                                }
                            
                                doc.end();
                            }
                        }
                    }) 
                }
            })
        }
    })
}

module.exports = {
    getReport: getReport
}


