'use strict';

const registerController = require('../../controllers/register');
const loginController = require('../../controllers/login');
const userControlller = require('../../controllers/user');
const advisorController = require('../../controllers/advisor');
const pillarController = require('../../controllers/pillar');
const commentController = require('../../controllers/comment');
const dataController = require('../../controllers/data');
const downloadController = require('../../controllers/download');
const healthController = require('../../controllers/health');
const reportController = require('../../controllers/report');
const homeController = require('../../controllers/home');
const verifyToken = require('../../auth/verifyToken');
const express = require('express');

let router = express.Router();

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/user', userControlller);
router.use('/advisor', advisorController);
router.use('/pillar', pillarController);
router.use('/comment', commentController);
router.use('/data', dataController);
router.use('/download', downloadController);
router.use('/health', healthController);
router.use('/report', reportController);
router.use('/home', homeController);


module.exports = router;
