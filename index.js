const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const pug       = require('pug');
const mysql     = require('mysql');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended: false});

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "mysql",
  password: "mysql",
  database: "Ecology"
});

app.use(cookieParser());
app.use(expressSession({
  secret: 'yadaun',
  resave: true,
  saveUninitialized: true,
}));

var sql;

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');


con.connect(function(err){
  if(err) throw err;
})

app.get('/', (req, res) => {
  console.log(req.session);
  res.render('index', {
    session: req.session
  });
});

app.get('/reg', (req, res) => {
  res.render('register',{
    session: req.session
  });
});

app.post('/reg', urlencodedParser, (req, res) => {
  sql = "INSERT INTO `Users` (`admin`, `login`, `password`, `email`, `id`)" +
  "VALUES ('0','" + req.body.login + 
  "', '" + req.body.password +
  "', '" + req.body.email + "', NULL);";
  con.query(sql, function(err, result){
    if(err) throw err;
    req.session.authorized = true;
    req.session.username = req.body.login;
    req.session.admin = false;
    req.session.save();
  });
  res.redirect('/');
});

app.post('/log', urlencodedParser , (req, res) =>{
  sql = "SELECT * FROM `Users` WHERE `login` = '" + req.body.login + "' OR `email` = '" + req.body.login  + "'";
  con.query(sql, function(err, result){
    if(err) throw err;
    if(result[0] != null && result[0].password == req.body.password){
      req.session.authorized = true;
      req.session.username = req.body.login;
      req.session.admin = result[0].admin;
      req.session.save();
      console.log(result[0]);
    }else{
      res.redirect('/log');
    }
  });
  res.redirect('/');
});

app.get('/logout', (req, res) =>{
  req.session.authorized = false;
  delete req.session.username;
  req.session.save();
  res.redirect('/');
});

app.get('/log', (req, res) => {
  res.render('login', {
    session: req.session
  });
  
});

app.get('/newarticle', (req, res) => {
  res.render('createArticle');
});

app.get('/article', (req, res) => {
  res.render('article', {
    session: req.session
  });
});

app.get('/photo', (req, res) => {
  res.render('photo',{
    session: req.session
  });
});

app.get('/upload', (req, res) => {
  res.render('uploadPhoto',{
    session: req.session
  });
});


http.listen('8080');



/*
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
*/

/*
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
*/

/*
var cookieParser = require('cookie-parser');
app.use(session({secret: 'rofl'}));
app.use(cookieParser());
var expressSession = require('express-session');
*/

/*
if(typeof session.username == 'undefined'){

}
*/
/*
con.connect(function(err){
  if(err) throw err;
  con.query(sql, function(err, result){
    if(err) throw err;
    if(result[0] != null){
      console.log("Попал! ");
      req.session.authorized = true;
      req.session.username = request.body.login;
      console.log(req.session.username);
    }else{
      console.log("Не попал!");
    }
  });
});
*/

/*if(anything){
  delete req.session.authorized;
  delete req.session.username;
  session.destroy();
}*/