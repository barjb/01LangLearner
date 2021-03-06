const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

// eslint-disable-next-line space-before-function-paren
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
      User.findOne({email: email}).then((user) => {
        if (!user) {
          return done(null, false, {message: 'That email is not registered'});
        }
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Password incorrect'});
          }
        });
      });
    }),
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
