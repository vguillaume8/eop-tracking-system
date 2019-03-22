'use strict';

const express = require('express');
const advisorService = require('../services/advisor');

let router = express.Router();

router.post('/student/:userId', advisorService.addStudent);
router.get('/student/:userId', advisorService.getStudents);
router.delete('/student/:userId', advisorService.deleteStudent);
router.get('/', advisorService.getAllAdvisors);
module.exports = router;