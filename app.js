// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

const path = require('path');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require('./config')(app);

// move all passports configuration to /config/
// **** using one file per Strategy to make it more readable
require('./config/passport.local')(app);
require('./config/passport')(app);
require('./config/passport.global')(app);

// default value for title local
const projectName = 'realtime';
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with Ironlauncher`;

// 👇 Start handling routes here

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/users'));

if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'local') {
  console.log('local app');
  app.use('/', require('./routes/tests'));
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
} else if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'localtest') {
  console.log('local app test');
  app.use('/', require('./routes/tests'));
  app.use(express.static(path.join(__dirname, '/clienttest/build')));
  app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + '/clienttest/build/index.html');
  });
} else if (process.env.ENVLOCAL && process.env.ENVLOCAL === 'localpub') {
  console.log('local app test');
  app.use('/', require('./routes/tests'));
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + '/client/build/index.html');
  });
} else {
  console.log('build app');
  const path = require('path');
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.use((req, res) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + '/client/build/index.html');
  });
}

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
