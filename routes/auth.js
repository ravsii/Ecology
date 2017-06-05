const router = require('express').Router();
const bodyParser = require("body-parser");
const mysql = require('../modules/mysql.js');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/register', (req, res) => {
  res.render('auth/register', {
    session: req.session
  });
});

router.post('/register', urlencodedParser, (req, res) => {
  mysql.query('INSERT INTO `Users` VALUES (?, ?, ?, ?, NULL);', [0, req.body.login, req.body.password, req.body.email], 
  (err, result) => {
    req.session.authorized = true;
    req.session.username = req.body.login;
    req.session.admin = false;
    req.session.save();
  });
  res.redirect('/');
});

router.get('/login', (req, res) => {
  res.render('auth/login', {
    session: req.session
  });
});

router.post('/login', urlencodedParser, (req, res) =>{
  mysql.query('SELECT * FROM `Users` WHERE `login` = ? OR `email` = ?', [req.body.login, req.body.login],
  (err, result) => {
    if(result[0] != null && result[0].password == req.body.password){
      req.session.authorized = true;
      req.session.username = result[0].login;
      req.session.admin = result[0].admin;
      req.session.save();
    } else {
      res.redirect('/auth/login');
    }
  });
  res.redirect('/');
});

router.get('/logout', (req, res) =>{
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;