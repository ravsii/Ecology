const router = require('express').Router();
const fileUpload = require('express-fileupload');
const mysql = require(__basePath + '/modules/mysql.js');
const comments = require(__basePath + '/modules/comments.js');

router.use(fileUpload());

router.get('/', (req, res) => {
  mysql.query('SELECT * FROM `images`;', function(err, result){
    res.render('gallery/gallery', {
      session: req.session,
      result: result
    });
  });
});

router.get('/:id', (req, res) => {
  const pid = req.params.id;
  mysql.query('SELECT * FROM `images` WHERE `id` = ?;', pid, function(err, photoData){
    if(photoData.length > 0){
      comments.load(pid, 2, (cData) => {
        res.render('gallery/photo',{
          session: req.session,
          photo: photoData[0],
          commentsData: cData
        });
      });
      mysql.query('UPDATE `images` SET `views` = views + 1 WHERE `id` = ?;', pid);
    } else res.redirect("/gallery");
  });
});

router.post('/upload',(req, res) => {
  if(!req.files.image.mimetype.indexOf("image/")) {
    mysql.query('INSERT INTO `images` VALUES (NULL, 0);', function(err, result){
      mysql.query('SELECT `id` FROM `images` ORDER BY `images`.`id` DESC LIMIT 0, 1;', function(err, result){
        req.files.image.mv(__basePath + '/public/user_files/photos/' + result[0].id, function(err) {
          if(err) console.log(err);
        });
        res.redirect("/gallery");
      });
    });
  } else res.redirect("/gallery");
});

module.exports = router;