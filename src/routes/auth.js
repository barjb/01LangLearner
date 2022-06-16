const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.post('/logout', (req, res) => {
  console.log('in backend logout');
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/languages',
    failureRedirect: '/',
    failureFlash: true,
  })(req, res, next);
});

router.post('/register', async (req, res) => {
  console.log(req.body);
  const {email, password, password2, firstName, lastName} = req.body;
  const user = await User.findOne({email: email});
  if (!(email && password && password2 && firstName && lastName)) {
    console.log('all fields must be filled');
    res.redirect('/');
    return;
  }
  if (user) {
    console.log('user already exists');
    res.redirect('/');
    return;
  }
  if (password != password2) {
    console.log('passwords do not match');
    res.redirect('/');
    return;
  }
  const newUser = new User({firstName, lastName, email});
  newUser.password = await bcrypt.hash(password, 10);
  newUser.save();
  console.log('created newuser');
  res.redirect('/');
});

module.exports = router;
