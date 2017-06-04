const router = require('express').Router();
const fileUpload = require('express-fileupload');

const mysql = require(__basePath + '/modules/mysql.js');

router.use(fileUpload());

router.get('/', (req, res) => {
  mysql.query('SELECT * FROM `images`;', function(err, result){
    res.render('gallery/gallery', {
      session: req.session,
      result: result
    });
  });
});

router.get('/pic/:id', (req, res) => {
  const pid = req.params.id;
  mysql.query('SELECT * FROM `images` WHERE `id` = ?;', pid, function(err, result){
    if(result.length > 0){
      //mysql.query('UPDATE `images` SET `views` = views + 1 WHERE `id` = ?;', pid);
      res.render('gallery/photo',{
        session: req.session,
        data: result[0]
      });
    } else {
      res.redirect("/gallery");
    }
  });
});

router.post('/upload',(req, res) => {
  mysql.query('INSERT INTO `images` VALUES (NULL, 0);', function(err, result){
    mysql.query('SELECT `id` FROM `images` ORDER BY `images`.`id` DESC LIMIT 0, 1;', function(err, result){
      req.files.image.mv(__basePath + '/public/user_files/photos/' + result[0].id, function(err) {
        if(err) console.log(err);
      });
      res.redirect("/gallery");
    });
  });
});

module.exports = router;