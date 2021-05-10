const express = require('express');
const app = express.Router();
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
module.exports = app;
