const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const pug       = require('pug');

//All stuff for rendering
app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    name: 'Ravsii'
  });
})

http.listen('8080');