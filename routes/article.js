const router = require('express').Router();
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");

const mysql = require(__basePath + '/modules/mysql.js');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(fileUpload());

router.get('/:id', (req, res) => {
  res.render('article/article', {
    session: req.session
  });
});

router.get('/new', (req, res) => {
  if(req.session.admin === 1){
    res.render('article/new', {
      session: req.session
    });
  } else res.redirect('/');
});


router.post('/new',urlencodedParser,(req, res) => {
  mysql.query('INSERT INTO `news` VALUES (NULL, ?, ?, ?);', [req.body.title, req.body.desc,0], 
  function(err, result){
    mysql.query('SELECT `id` FROM `news` ORDER BY `news`.`id` DESC LIMIT 0, 1;', function(err, result){
      console.log(result);
      req.files.image.mv(__basePath + '/public/user_files/news/' + result[0].id, function(err) {
        if(err) console.log(err);
      });
      res.redirect("/");
    });
  });
});

module.exports = router;