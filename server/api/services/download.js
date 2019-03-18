'use-strict'
const httpResponse = require('../responses/httpresponses');
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

module.exports = {
    downloadFile: downloadFile
}