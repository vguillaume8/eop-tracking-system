'use strict';

const api = require('./api/api')();
const config = require('./configs/config');
const db = require('./configs/db');

// creates the server- passes in the config and database settings
api.create(config, db);

// starts express server
api.start();
