'use-strict'

const express = require('express');
const downloadService = require('../services/download');

let router = express.Router();

router.get('/:file', downloadService.downloadFile);



module.exports = router;