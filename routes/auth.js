const router = require('express').Router();
const bodyParser = require("body-parser");
const mysql = require('../modules/mysql.js');

var urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/register', (req, res) => {
  res.render('auth/register', {
    session: req.session
  });
});

router.post('/register', urlencodedParser, (req, res) => {
  sql = "INSERT INTO `Users` (`admin`, `login`, `password`, `email`, `id`)" +
  "VALUES ('0','" + req.body.login + 
  "', '" + req.body.password +
  "', '" + req.body.email + "', NULL);";
  mysql.query(sql, function(err, result){
    if(err) throw err;
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

router.post('/login', urlencodedParser , (req, res) =>{
  sql = "SELECT * FROM `Users` WHERE `login` = '" + req.body.login + "' OR `email` = '" + req.body.login  + "'";
  mysql.query(sql, function(err, result){
    if(err) throw err;
    if(result[0] != null && result[0].password == req.body.password){
      req.session.authorized = true;
      req.session.username = req.body.login;
      req.session.admin = result[0].admin;
      req.session.save();
    }else{
      res.redirect('/auth/login');
    }
  });
  res.redirect('/');
});

router.get('/logout', (req, res) =>{
  delete req.session;
  req.session.authorized = false;
  req.session.save();
  res.redirect('/');
});

module.exports = router;