const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const pug       = require('pug');

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/reg', (req, res) => {
  res.render('register');
});

app.get('/log', (req, res) => {
  res.render('login');
});

app.get('/newarticle', (req, res) => {
  res.render('createArticle');
});

app.get('/article', (req, res) => {
  res.render('article');
});

app.get('/photo', (req, res) => {
  res.render('photo');
});

app.get('/upload', (req, res) => {
  res.render('uploadPhoto');
});

http.listen('8080');