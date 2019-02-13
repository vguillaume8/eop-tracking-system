'use strict';

const express = require('express');
const userService = require('../services/user');

let router = express.Router();

router.get('/:userId', userService.retrieve);

module.exports = router;