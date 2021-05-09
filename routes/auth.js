const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

const { alreadyLogged, loginCheck } = require('./middlewares');

router.get('/login', alreadyLogged(), (req, res, next) => {
  res.render('auth/login');
});

router.get('/signup', alreadyLogged(), (req, res, next) => {
  res.render('auth/signup');
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true,
  })
);

//if you need more control and also want to set an error message
router.post('/loginapi', (req, res, next) => {
  console.log('router.post', req.body);
  passport.authenticate('local', (err, theUser, failureDetails) => {
    console.log('Inside passport.authenticate', err, theUser, failureDetails);
    if (err) res.status(200).json({ err, success: false });
    if (!theUser) res.status(200).json({ err, success: false });
    req.login(theUser, (err) => {
      if (err) res.status(200).json({ err, success: false });
      const { username, fullName, _id } = theUser;
      return res.status(200).json({ success: true, username, fullName, _id });
    });
  })(req, res, next);
});

router.post('/signup', (req, res, next) => {
  const { username, password, email, fullName } = req.body;
  if (password.length < 8) {
    return res.render('auth/signup', {
      message: 'Your password has to be 8 chars min',
    });
  }
  if (username === '' || email === '' || password === '' || fullName === '') {
    return res.render('auth/signup', {
      message: 'Please fill in all obligatory fields',
    });
  }
  User.findOne({ username }).then((user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'This username is already taken' });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({ username, email, fullName, password: hash }).then(
        (createdUser) => {
          req.login(createdUser, (err) => {
            if (err) {
              next(err);
            } else {
              res.redirect('/');
            }
          });
        }
      );
    }
  });
});

router.get('/private', loginCheck(), (req, res) => {
  res.render('auth/private', { user: req.user });
});

module.exports = router;
