const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

const { loginCheck } = require('./middlewares');

router.get('/auth/user', (req, res) => {
  if (req.user) {
    const { username, fullName, _id } = req.user;
    res.json({ username, fullName, _id });
  } else {
    res.json({ username: null });
  }
});

getUsers = async (req, res) => {
  await Users.find({}, (err, users) => {
    if (err) {
      return res.status(200).json({ success: false, error: err });
    }
    if (!users.length) {
      return res.status(200).json({ success: false, error: `no one` });
    }
    const exportedUsers = users.map((el) => {
      const { username, fullName, _id } = el;
      return { username, fullName, _id };
    });
    return res.status(200).json({ success: true, data: exportedUsers });
  }).catch((err) => console.log(err));
};

router.get('/api/users', loginCheck(), getUsers);

module.exports = router;
