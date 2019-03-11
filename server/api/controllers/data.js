'use-strict'

const express = require('express');
const dataService = require('../services/data');

let router = express.Router();

router.get('/', dataService.getData);
router.get('/:search', dataService.search);


module.exports = router;