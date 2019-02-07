'use strict';

const registerController = require('../../controllers/register');
//const homeController = require('../../controllers/apis/home');
const express = require('express');

let router = express.Router();

// router.use('/register', registerController);
// router.use('/login', loginController);
// router.use('/dashboard', dashboardController);
// router.use('/user', userController);

router.use('./register', registerController);


module.exports = router;
