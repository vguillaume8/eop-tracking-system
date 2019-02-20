'use strict';

const express = require('express');
const userService = require('../services/user');

let router = express.Router();

router.get('/:userId', userService.retrieve);
router.get('/pillar/:userId', userService.getPillar);
router.post('/pillar/:userId', userService.updatePillar);
router.get('/', userService.getUsers);
router.post('/role/:userId', userService.changeRole);

module.exports = router;