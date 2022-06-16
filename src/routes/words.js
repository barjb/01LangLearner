const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

const wordsController = require('../controllers/wordsController');

router.route('/:id').get(wordsController.getDictionaryByCode);
router.route('/:id/:page').get(wordsController.getDictionariesPagination);
router
  .route('/test/:id/:page')
  .get(wordsController.getDictionariesForTestPagination);
module.exports = router;
