const express = require('express');

const resultsContoller = require('../controllers/results');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const index = true;
  res.render('index', {
    index,
    title: 'Home',
  });
});

/* POST request to API */
router.get('/results', resultsContoller.getResults);

router.get('*', (req, res) => {
  res.redirect('/');
});

module.exports = router;
