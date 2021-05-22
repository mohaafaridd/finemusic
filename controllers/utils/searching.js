const getSearchMethod = (type) => {
  switch (type) {
    case 'artist':
    case 'track':
    case 'album':
      return [`${type}.search`, `${type}.getInfo`, `${type}.getTopTracks`];
    default:
      return new Error('Invalid Method');
  }
};

const getSearchProperty = (value) => {
  switch (value) {
    case 'artist':
      return 'artistmatches';

    case 'track':
      return 'trackmatches';

    case 'album':
      return 'albummatches';

    default:
      return new Error('Invalid Property');
  }
};

module.exports = {
  getSearchMethod,
  getSearchProperty,
};
