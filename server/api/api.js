'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser'); 
const cors = require('cors');
const path = require('path');

module.exports = function() {
  let server = express(), create, start;

  create = function(config, db) {
    let routes = require('./routes/route');

    // Server settings
    //server.set('env', config.env);
    server.set('port', config.port);
    server.set('hostname', config.hostname);
    //server.set('viewDir', config.viewDir);
    //server.use(express.static(path.join(__dirname, '../../client/dist')));
    // Returns middleware that parses json
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    //server.use(multer({dest:'./uploads/'}));
    server.use(logger('dev'));
    server.use(passport.initialize());
    try {
      mongoose.connect(db.database);
      connection.on('connected', function(){
        console.log("DB connected");
      });
    } catch {
      console.log("cannot connect to database")
    }

  
    

    //server.use('/uploads', express.static('uploads'));

    //server.set('views', server.get('viewDir'));

    // Set up routes
    routes.init(server);
  };

  start = function() {
    let hostname = server.get('hostname'), port = server.get('port');

    server.listen(port, function () {
      console.log('Express server listening on - http://' + hostname + ':' + port);
    });
  };

  return {
    create: create,
    start: start
  };
};