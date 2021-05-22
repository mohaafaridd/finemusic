const { isEmpty } = require('validator');
const { getBio } = require('./requests/bio');
const { getTopSongs } = require('./requests/topSongs');

const getBestImage = (array) => {
  const reversedArray = array.reverse();
  let image = '';

  reversedArray.forEach((element) => {
    if (isEmpty(image)) {
      image = element['#text'];
    }
  });

  return image;
};

const getObject = async (object, type, method) => {
  const model = {
    id: object.id,
    name: object.name,
    image: await getBestImage(object.image),
    get corrupt() {
      return isEmpty(this.image);
    },
    listeners: object.listeners,
  };

  if (type === 'artist') {
    model.bio = await getBio(type, method[1], model);
    model.songs = await getTopSongs('artist', method[2], model);
  } else {
    model.artist = object.artist;
    model.url = object.url;
    model.bio = await getBio(type, method[1], model, model.artist);
  }

  if (model.bio === 'Your request cannot be done') {
    model.corrupt = true;
  }

  return model;
};

module.exports = {
  getObject,
};
