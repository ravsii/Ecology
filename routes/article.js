const router = require('express').Router();
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const mysql = require(__basePath + '/modules/mysql.js');
const comments = require(__basePath + '/modules/comments.js');

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.use(fileUpload());

router.get('/new', (req, res) => {
  res.render('article/new', {
    session: req.session
  });
});

router.get('/suggested', (req, res) => {
  if(req.session.admin) {
    mysql.query('SELECT * FROM `news` WHERE `public` = 0;', (err, suggested) => {
      res.render('article/suggested',{
        session: req.session,
        suggested: suggested
      });
    });
  } else res.redirect('/');
});

router.get('/approve/:id', (req, res) => {
  if(req.session.admin) {
    mysql.query('UPDATE `news` SET `public` = 1 WHERE `id` = ?;', req.params.id, () => {
      res.redirect('/article/' + req.params.id);
    });
  } else res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  if(req.session.admin) {
    mysql.query('DELETE FROM `news` WHERE `id` = ?;', req.params.id, () => {
      res.redirect('/');
    });
  } else res.redirect('/');
});

router.get('/:id', (req, res) => {
  const pid = req.params.id;
  mysql.query('SELECT * FROM `news` WHERE `id` = ?;', pid, (err, articleData) => {
    if(articleData.length > 0){
      mysql.query('UPDATE `news` SET `views` = views + 1 WHERE `id` = ?;', pid);
      comments.load(pid, 1, (cData) => {
        res.render('article/article',{
          session: req.session,
          article: articleData[0],
          commentsData: cData
        });
      });
    } else res.redirect("/");
  });
});

router.post('/new',urlencodedParser,(req, res) => {
  mysql.query('INSERT INTO `news` VALUES (NULL, ?, ?, ?, ?);', [req.body.title, req.body.desc,0, req.session.admin], (err, result)  => {
    mysql.query('SELECT `id` FROM `news` ORDER BY `news`.`id` DESC LIMIT 0, 1;', (err, result) => {
      req.files.image.mv(__basePath + '/public/user_files/news/' + result[0].id, (err) => {
        if(err) console.log(err);
      });
      res.redirect("/");
    });
  });
});

module.exports = router;