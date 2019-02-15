const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const index = true;
  res.render('index', { index });
});

router.post('/results', function (req, res, next) {
  res.render('results');
});

module.exports = router;
