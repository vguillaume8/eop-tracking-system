'use strict';

const express = require('express');
const server = express();
const path = require('path');

let router = express.Router();


server.use(express.static(path.join(__dirname, '../../../client/dist')));



module.exports = router;