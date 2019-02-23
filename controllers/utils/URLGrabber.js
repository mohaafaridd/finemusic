const lastfm = process.env.LAST_FM;

const getParams = (type, method, value) => {
  switch (type) {
    case 'artist':
    case 'track':
    case 'album':
      return `?method=${method}&${type}=${value}&api_key=${lastfm}`;
    default:
      return new Error('Invalid type');
  }
};

const getURL = (params, limit) => `http://ws.audioscrobbler.com/2.0/${params}&limit=${limit}&format=json`;

module.exports = {
  getParams,
  getURL,
};
