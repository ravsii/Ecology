const express = require('express');
const fileUpload = require('express-fileupload');
const mysql = require('../modules/mysql.js');

const app  = express();
const router = express.Router();

app.use(fileUpload());

router.get('/', (req, res) => {
  sql = "SELECT * FROM `images` ";
  mysql.query(sql, function(err, result){
    if(err) throw err;
    res.render('gallery', {
      session: req.session,
      result: result
    });
  });
});

app.get('/:id', (req, res) => {
  res.render('photo',{
    session: req.session
  });
});

router.post('/upload',(req, res) => {
  sql = "INSERT INTO `images` (`id`, `views`) VALUES (NULL, 0);";
  mysql.query(sql, function(err, result){
    if(err) throw err;
    sql = "SELECT `id` FROM `images` ORDER BY `images`.`id` DESC LIMIT 0, 1;";
    mysql.query(sql, function(err, result){
      if(err) throw err;
      let pathFile = './public/user_files/photos/' + result[0].id;
      req.files.image.mv(pathFile, function(err) {
        if(err) console.log(err);
      });
      res.redirect("/gallery");
    });
  });
});

module.exports = router;