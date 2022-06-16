const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('home', {
    title: 'home page',
  });
});

router.get('/settings', (req, res) => {
  res.render('settings', {title: 'settings'});
});

router.get('/ranking', (req, res) => {
  res.render('ranking', {title: 'ranking'});
});

router.get('/statistics', (req, res) => {
  res.render('statistics', {title: 'statistics'});
});

module.exports = router;
