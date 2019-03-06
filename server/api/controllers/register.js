'use strict';

const express = require('express');
const registerService = require('../services/register');

let router = express.Router();

router.post('/', registerService.register);
module.exports = router;
