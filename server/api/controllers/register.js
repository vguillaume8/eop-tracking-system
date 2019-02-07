'use strict';

const express = require('express');
c//onst registerService = require('../../services/authentication/register');

let router = express.Router();

//router.post('/', registerService.registerUser);
//router.post('/phone', registerService.checkPhone);
router.get('/', function(req, res){
    res.send("Endpoint reached")
});
module.exports = router;