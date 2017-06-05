const router = require('express').Router();
const bodyParser = require("body-parser");
const mysql = require('../modules/mysql.js');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post('/add/:id/:type', urlencodedParser, (req, res) => {
  mysql.query('INSERT INTO `comments` VALUES (NULL, ?, ?, ?, ?);', [req.session.uid, req.body.text, req.params.type, req.params.id], 
  (err, result) => {
    switch(req.params.type){
      case '1':
        res.redirect('/article/' + req.params.id + '#comments');
        break;
        
      case '2':
        res.redirect('/gallery/' + req.params.id + '#comments');
        break;
    }
  });
});

module.exports = router;