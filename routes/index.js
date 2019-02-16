const express = require('express');
const converter = require('number-to-words');

const router = express.Router();

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/* GET home page. */
router.get('/', function (req, res, next) {
  const index = true;
  res.render('index', {
    index
  });
});

const people = [{
    animationTime: 0,
    name: 'John Doe',
    picture: "https://bit.ly/2VyAnIv",
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum modi provident cum, praesentium ipsum reiciendis dignissimos animi eligendi totam, delectus culpa repudiandae voluptatibus? Consequatur ut voluptatum provident voluptate esse dignissimos.',
    songs: [{
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
  },
  {
    animationTime: 0.5,
    name: 'Jane Doe',
    picture: "https://bit.ly/2GxSeLJ",
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum modi provident cum, praesentium ipsum reiciendis dignissimos animi eligendi totam, delectus culpa repudiandae voluptatibus? Consequatur ut voluptatum provident voluptate esse dignissimos.',
    songs: [{
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
];


const count = capitalizeFirstLetter(converter.toWords(people.length));

/* POST request to API */
router.post('/results', function (req, res, next) {
  const results = true;

  res.render('results', {
    results,
    people,
    count
  });
});

module.exports = router;