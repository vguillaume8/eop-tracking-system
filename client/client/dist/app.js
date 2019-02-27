var express = require('express');
path = require('path');
server = express();


var port = 10021;


server.use(express.static(path.join(__dirname, '/')));

server.listen(port);

console.log("Listening on port " + port);