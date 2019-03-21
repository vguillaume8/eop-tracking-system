'use-strict'
const PDFDocument = require('pdfkit')
const User = require('../../models/user');
const Pillar = require('../../models/pillar');
const Comment = require('../../models/comment');



function getReport(req, res){

    // pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
    //     if (err) return console.log(err);
    //     console.log(res); // { filename: '/app/businesscard.pdf' }
    //   });

    //   var name = 'Vinston';
    //   res.render(__dirname + "/static/invoice.html", {name:name});
    User.findOne({n_id: req.params.userId}, function(err, user){
        if(err) throw err;

        Pillar.findOne({student_id: req.params.userId}, function(err, pillar){
            if(err) throw err;

            Comment.find({n_id: req.params.userId}, function(err, comments){



                if(err) throw err;
                console.log(user.firstname)

                if(pillar == null){
                    res.send("Can not generate report, no pillar data found");
                }else{
    
                    let pillarPercentages = computePillarPercentages(pillar);
                    res.setHeader('Content-type', 'application/pdf');
                    res.writeHead( 200, {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename=${user.lastname+user.firstname}.pdf`
                    } );
            
                    let doc = new PDFDocument()
            
            
                    doc.pipe(res);
                    // PDF Creation logic goes here
            
                    doc.image(__dirname + '/static/newpaltz_logo.png', 0, 0, {width: 150});
                    // Set a title and pass the X and Y coordinates
                    doc.moveDown();
                    doc.fontSize(20).text('Progress Report', {
                        align: 'center'
                    });
            
                    doc.moveDown().font('Times-Roman', 13);
            
                    doc.text(`Student: ${capitalize(user.firstname, user.lastname)}`)
                    doc.text(`Advisor: ${user.advisor}`)
                    // Set the paragraph width and align direction
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

                        doc.text('------------------------------------------------------------------------------------------------------------')
                       
                    }
                
                    doc.end();
                }

            })
         
          
            
            

            

        })



   
    
      });
}


function  capitalize(firstname, lastname){
    return firstname.charAt(0).toUpperCase() + firstname.slice(1) + " " + lastname.charAt(0).toUpperCase() + lastname.slice(1);
}



function computePillarPercentages(pillar){

    return {
        SelfActulization: Math.round(Object.values(pillar.SelfActulization).reduce(getSum) * 3.4482),
        Emotional: Math.round(Object.values(pillar.Emotional).reduce(getSum) * 4),
        Community: Math.round(Object.values(pillar.Community).reduce(getSum) * 6),
        Intellectual: Math.round(Object.values(pillar.Intellectual).reduce(getSum) * 5),
        Health: Math.round(Object.values(pillar.Health).reduce(getSum) * 6),
        ProfessionalAcademic: Math.round(Object.values(pillar.ProfessionalAcademic).reduce(getSum) * 4),
    }
}

function getSum(total, num) {
    return total + num;
}



module.exports = {
    getReport: getReport
}


