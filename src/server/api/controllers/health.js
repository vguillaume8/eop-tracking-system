'use-strict';

const express = require('express');
const healthService = require('../services/health');

const router = express.Router();

router.get('/', healthService.getStatus);



module.exports = router;
