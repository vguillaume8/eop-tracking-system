'use-strict'

const express = require('express');
const downloadService = require('../services/download');

const router = express.Router();

router.get('/file/:file', downloadService.downloadFile);
router.get('/student', downloadService.downloadStudentAll);



module.exports = router;
