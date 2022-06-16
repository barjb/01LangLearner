module.exports = {
  // eslint-disable-next-line space-before-function-paren
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/');
  },
  // eslint-disable-next-line space-before-function-paren
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/languages');
  },
};
