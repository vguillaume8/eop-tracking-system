'use strict';

const mongoose = require('mongoose');
const connection = mongoose.connection;
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser'); 
const cors = require('cors');


module.exports = function() {

  // Creates the express sever
  let server = express(), create, start;

  create = function(config, db) {

    // Sets up the routing
    let routes = require('./routes/route');

    // Server settings
    server.set('port', config.port);
    server.set('hostname', config.hostname);
 
    // Enables cors
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(cookieParser());
    
    // Logging
    server.use(logger('dev'));
    server.use(passport.initialize());

    // Database connection
    try {
      mongoose.connect(db.database);
      connection.on('connected', function(){
        console.log("DB connected");
      });
    } catch {
      console.log("cannot connect to database")
    }

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