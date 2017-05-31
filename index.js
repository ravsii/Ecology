const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const pug       = require('pug');
const mysql     = require('mysql');
var session = require('express-session');
/*
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
*/
const con = mysql.createConnection({
  host: "localhost",
  user: "mysql",
  password: "mysql",
  database: "Ecology"
});

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//app.use(cookieParser());
//app.use(expressSession({secret: 'yadaun'}));

//var sql = "INSERT INTO `Users` (`Login`, `Password`, `Email`, `id`) VALUES ('JackKaif_2', 'qwerty', 'jackkaif@gmail.com', NULL);"
var sql = "SELECT * FROM `Users` WHERE `login` = 'JackKaif' OR `email` = 'Batamar'";

/*
var cookieParser = require('cookie-parser');
app.use(session({secret: 'rofl'}));
app.use(cookieParser());
var expressSession = require('express-session');
*/

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Ravsii'
  });
if(typeof session.username == 'undefined'){

}
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
})
var sess;
app.get('/1/', function (req, res) {
  console.log(sess);
  delete sess.names1;
  res.redirect('/3');

})

app.get('/2/', function (req, res){
  res.render('index');
  sess = req.session;
  sess.names1 = "qweq";
  console.log(sess);
})

app.get('/3/', function (req, res){
  res.render('index');
  console.log(sess);
})

http.listen('8080');
