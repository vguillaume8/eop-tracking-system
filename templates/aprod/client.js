const express = require('express');

path = require('path');

const history = require('connect-history-api-fallback')

server = express();

server.use(history());


var port = 80;


server.use(express.static(path.join(__dirname, '/')));

server.listen(port);