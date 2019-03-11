'use strict';

const registerController = require('../../controllers/register');
const loginController = require('../../controllers/login');
const userControlller = require('../../controllers/user');
const advisorController = require('../../controllers/advisor');
const pillarController = require('../../controllers/pillar');
const commentController = require('../../controllers/comment');
const dataController = require('../../controllers/data');

const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/user', userControlller);
router.use('/advisor', advisorController);
router.use('/pillar', pillarController);
router.use('/comment', commentController);
router.use('/data', dataController);


module.exports = router;
