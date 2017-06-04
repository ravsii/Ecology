const expressSession = require('express-session');

var init = function(app) {
  app.use(expressSession({
    secret: 'yadaun',
    resave: true,
    saveUninitialized: true,
  }));
  app.use((req, res, next) => {
    if(typeof req.session.authorized === 'undefined'){
      req.session.authorized = false;
      req.session.save();
    }
    next();
  });
}

module.exports = init;