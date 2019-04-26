'use-strict'

const express = require('express');
const reportService = require('../services/report');

const router = express.Router();

router.get('/:userId', reportService.getReport);




module.exports = router;
