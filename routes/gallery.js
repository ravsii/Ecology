const router = require('express').Router();
const fileUpload = require('express-fileupload');

const mysql = require(__basePath + '/modules/mysql.js');

router.use(fileUpload());

router.get('/', (req, res) => {
  mysql.query('SELECT * FROM `images`;', function(err, result){
    res.render('gallery', {
      session: req.session,
      result: result
    });
  });
});

router.get('/:id', (req, res) => {
  res.render('photo',{
    session: req.session,
    id: req.params.id
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