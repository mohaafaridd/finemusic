const { isEmpty } = require('validator');
const { getBio } = require('./requests/bio');
const { getTopSongs } = require('./requests/topSongs');
const { isRepeated } = require('./validationUtils');

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
    name: object.name,
    image: await getBestImage(object.image),
    get corrupt() { return isEmpty(this.image); },
  };

  console.log(model.corrupt);

  if (type === 'artist') {
    model.bio = await getBio(type, method[1], model);
    model.songs = await getTopSongs('artist', method[2], model);
  } else {
    model.artist = object.artist;
    model.url = object.url;
    model.bio = await getBio(type, method[1], model, model.artist);
  }

  return model;
};


const getOutput = async (input, type, methods) => {
  const output = [];

  const setArray = [...new Set(input)];

  // TODO: Filter those duplicates in inputs!

  // I don't really understand this to the fullest.
  await Promise.all(setArray.map(async (selected) => {
    if (await !isRepeated(output, selected.name)) {
      const obj = await getObject(selected, type, methods);

      const isArtist = type === 'artist';

      obj.isArtist = isArtist;

      if (obj.corrupt === false) {
        output.push(obj);
      }
    }
  }));

  return output;
};

module.exports = {
  getOutput,
};
