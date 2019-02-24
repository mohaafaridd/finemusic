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

const order = (array) => {
  array.sort((a, b) => {
    const count0 = parseInt(a.listeners, 10);
    const count1 = parseInt(b.listeners, 10);

    if (count0 > count1) {
      return -1;
    }

    if (count0 < count1) {
      return 1;
    }

    return 0;
  });
};

const filterDuplicates = (array) => {
  const filtered = [];
  filtered.push(array[0]);

  for (let index = 1; index < array.length; index += 1) {
    const element = array[index];
    if (!isRepeated(filtered, element.name)) {
      filtered.push(element);
    }
  }

  return filtered;
};

const getOutput = async (input, type, methods) => {
  const output = [];

  order(input);

  const filteredInputs = filterDuplicates(input);

  // TODO: Filter those duplicates in inputs!

  // I don't really understand this to the fullest.
  await Promise.all(filteredInputs.map(async (selected) => {
    const obj = await getObject(selected, type, methods);

    const isArtist = type === 'artist';

    obj.isArtist = isArtist;

    if (obj.corrupt === false) {
      output.push(obj);
    }
  }));

  order(output);

  return output;
};

module.exports = {
  getOutput,
};
