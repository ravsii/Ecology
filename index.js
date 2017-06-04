const express = require('express');
const app = express();
const http = require('http').Server(app);
const pug = require('pug');

global.__basePath = __dirname;

//Vital requires
require('./modules/session.js')(app);
require('./mount.js')(app);

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

http.listen('8080');