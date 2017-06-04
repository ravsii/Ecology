const router = require('express').Router();

router.get('/', (req, res) => {
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

module.exports = router;