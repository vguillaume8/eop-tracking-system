'use-strict'

const express = require('express');
const dataService = require('../services/data');

let router = express.Router();

router.get('/', dataService.getData);
router.get('/:search', dataService.search);
router.post('/student', dataService.uploadStudentData);
router.get('/advisor/:advisorName', dataService.getAmountOfAdvisorStudents);


module.exports = router;