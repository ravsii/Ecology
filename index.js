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

//var sql = "INSERT INTO `Users` (`Login`, `Password`, `Email`, `id`) VALUES ('JackKaif_2', 'qwerty', 'jackkaif@gmail.com', NULL);"
var sql;

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');


con.connect(function(err){
  if(err) throw err;
})

app.get('/2/', function (req, res){
  res.render('index');
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

app.post('/log', urlencodedParser , (req, res) =>{
  console.log(req.body);
  sql = "SELECT * FROM `Users` WHERE `login` = '" + req.body.login + "' OR `email` = '" + req.body.password  + "'";
  con.query(sql, function(err, result){
    if(err) throw err;
    console.log(result[0]);
    if(result[0] != null){
      req.session.authorized = true;
      req.session.username = req.body.login;
      req.session.save();
      console.log(req.session);
    }else{
      console.log("Не попал!");
    }
  });
  //delete req.session.names12345;
  req.session.save();
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