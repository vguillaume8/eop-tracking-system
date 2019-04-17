'use-strict';

const express = require('express');
const healthService = require('../services/health');

let router = express.Router();

router.get('/', healthService.getStatus);



module.exports = router;