const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const languagesController = require('../controllers/languagesController');

router.route('/').get(languagesController.getLanguages);
router.route('/:id').get(languagesController.getList);
router.route('/:id/:page').get(languagesController.getDictionariesPagination);

module.exports = router;
