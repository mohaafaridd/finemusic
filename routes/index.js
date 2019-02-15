const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const index = true;
  res.render('index', { index });
});

/* POST request to API */
router.post('/results', function (req, res, next) {
  const results = true;

  res.render('results', {
    results,
    people: [
      {
        name: 'John Doe',
        picture: "https://bit.ly/2VyAnIv",
        bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum modi provident cum, praesentium ipsum reiciendis dignissimos animi eligendi totam, delectus culpa repudiandae voluptatibus? Consequatur ut voluptatum provident voluptate esse dignissimos.',
        songs: [
          {
            title: 'Dancing Queen',
            link: 'https://open.spotify.com/track/0GjEhVFGZW8afUYGChu3Rr?si=NgFSZq28QJKE_2yclyr5Sg'
          },
          {
            title: 'Gimme Gimme',
            link: 'https://open.spotify.com/track/3vkQ5DAB1qQMYO4Mr9zJN6?si=W5i-vu3YQ2uT-edfyvrOvw'
          },
          {
            title: 'Wake Up',
            link: 'https://open.spotify.com/track/6K6OCvFQ4i7KKfGJsOAqY1?si=NfZeQLn6SQuZxmd7QRqt7g'
          }
        ]
      }
    ]
  });
});

module.exports = router;
