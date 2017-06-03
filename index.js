const express = require('express');
const app     = express();
const http    = require('http').Server(app);
const pug     = require('pug');

//Vital requires
var s = require('./modules/session.js');
s.init(app);
require('./mount.js')(app);


console.log('from index');

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

http.listen('8080');