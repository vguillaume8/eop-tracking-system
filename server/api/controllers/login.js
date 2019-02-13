'use strict';

const express = require('express');
const loginService = require('../services/login');

let router = express.Router();

router.post('/', loginService.login);

module.exports = router;