'use strict';

const registerController = require('../../controllers/register');
const loginController = require('../../controllers/login');
const userControlller = require('../../controllers/user');
const advisorController = require('../../controllers/advisor');

const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/user', userControlller);
router.use('/advisor', advisorController);


module.exports = router;
