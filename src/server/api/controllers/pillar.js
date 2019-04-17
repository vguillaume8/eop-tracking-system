'use strict';

const express = require('express');
const pillarService = require('../services/pillar');

let router = express.Router();


router.get('/:userId', pillarService.getPillar);
router.post('/:userId', pillarService.updatePillar);
router.get('/meta/:userId', pillarService.getMetaPillar);
router.post('/meta/increment/:userId', pillarService.increment);
router.post('/meta/decrement/:userId', pillarService.decrement);

module.exports = router;