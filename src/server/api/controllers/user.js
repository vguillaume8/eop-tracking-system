'use strict';

const express = require('express');
const userService = require('../services/user');

const router = express.Router();

router.get('/:userId', userService.retrieve);
router.get('/', userService.getUsers);
router.post('/:userId', userService.updateUser);
router.post('/role/:userId', userService.changeRole);
router.delete('/:userId', userService.deleteUser);

module.exports = router;
