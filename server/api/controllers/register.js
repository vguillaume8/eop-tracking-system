'use strict';

const express = require('express');
const registerService = require('../services/register');

let router = express.Router();

//router.post('/', registerService.registerUser);
//router.post('/phone', registerService.checkPhone);
router.get('/', function(req, res){
    res.send("Register Endpoint reached")
});

router.post('/', registerService.register);
module.exports = router;
