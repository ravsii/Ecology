const expressSession = require('express-session');
const express = require('express');
const app     = express();



  var init = function(app) {
  //Default session
    app.use(expressSession({
    secret: 'yadaun',
    resave: true,
    saveUninitialized: true,
  }));
  app.use((req, res, next) => {
    req.session.authorized = false;
    req.session.save();
    //console.log(req.session);
    
    next();
  });
  console.log('lul');
  }

module.exports.init = init;