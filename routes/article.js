const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('article', {
    session: req.session
  });
});

router.get('/new', (req, res) => {
  res.render('newArticle', {
    session: req.session
  });
});

module.exports = router;