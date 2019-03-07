'use strict';

const express = require('express');
const loginService = require('../services/login');

let router = express.Router();

router.post('/', loginService.login);


router.get('*', function(req, res){
    res.send("Error go back");
});


module.exports = router;