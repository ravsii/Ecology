const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', {
    session: req.session
  });
});

module.exports = router;
module.exports.URL = "/";