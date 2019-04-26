'use strict';

const express = require('express');
const advisorService = require('../services/advisor');

const router = express.Router();

router.post('/student/:userId', advisorService.addStudent); // Adds student advisor list
router.get('/student/:userId', advisorService.getStudents); // Gets all students in advisor list
router.delete('/student/:userId', advisorService.deleteStudent); // Deletes student in advisor list
router.get('/', advisorService.getAllAdvisors); // get all advisors


module.exports = router;
