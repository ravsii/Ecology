const router = require('express').Router();
const mysql = require('../modules/mysql.js');

router.get('/', (req, res) => {
  mysql.query('SELECT * FROM `news`;', function(err, result){
    res.render('index', {
    session: req.session,
    result: result
    });
  });
});

module.exports = router;
module.exports.URL = "/";