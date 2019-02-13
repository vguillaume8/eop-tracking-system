'use strict';

const registerController = require('../../controllers/register');
const loginController = require('../../controllers/login');
const userControlller = require('../../controllers/user');
//const homeController = require('../../controllers/apis/home');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/user', userControlller);


module.exports = router;
