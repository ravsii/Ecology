const router = require('express').Router();
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const mysql = require(__basePath + '/modules/mysql.js');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(fileUpload());

router.get('/new', (req, res) => {
  if(req.session.admin === 1){
    res.render('article/new', {
      session: req.session
    });
  } else res.redirect('/');
});

router.get('/:id', (req, res) => {
  const pid = req.params.id;
  mysql.query('SELECT * FROM `news` WHERE `id` = ?;', pid, function(err, articleData){
    if(articleData.length > 0){
      mysql.query('UPDATE `news` SET `views` = views + 1 WHERE `id` = ?;', pid);
      mysql.query('SELECT comments.*, users.login FROM `comments` LEFT JOIN `users` ON (comments.id_author = users.id) WHERE `type` = ? AND `id_parent` = ? ORDER BY `comments`.`id` DESC;', [1, pid],
      (err, commmentsData) => {
        if(typeof commmentsData === 'undefined' || commmentsData.length === 0) commmentsData = false;
        console.log(commmentsData);
        res.render('article/article',{
          session: req.session,
          article: articleData[0],
          comments: commmentsData
        });
      });
    } else {
      res.redirect("/gallery");
    }
  });
});

router.post('/new',urlencodedParser,(req, res) => {
  mysql.query('INSERT INTO `news` VALUES (NULL, ?, ?, ?, ?);', [req.body.title, req.body.desc,0, req.session.admin], 
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