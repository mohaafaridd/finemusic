const express = require('express');

const resultsContoller = require('../controllers/results');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const index = true;
  res.render('index', {
    index,
    title: 'Home'
  });
});


/* POST request to API */
router.post('/results', resultsContoller.postResults);

module.exports = router;