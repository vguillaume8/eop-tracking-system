'use-strict'

const express = require('express');
const multer = require('multer');
const upload = multer({dest:'./uploads/'});
const dataService = require('../services/data');

const router = express.Router();

router.get('/', dataService.getData);
router.get('/:search', dataService.search);
router.post('/student', upload.single('file'), dataService.uploadStudentData);
router.get('/advisor/:advisorName', dataService.getAmountOfAdvisorStudents);


module.exports = router;
