const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const testController = require('../controllers/testController');

router.route('/:id/:page').get(testController.getTest);

module.exports = router;
