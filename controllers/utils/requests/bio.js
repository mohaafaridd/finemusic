const axios = require('axios');
const { getParams, getURL } = require('../URLGrabber');

const getBio = async (type, method, model, artist) => {
  const value = encodeURIComponent(model.name);

  let params = getParams(type, method, value);

  if (artist) {
    params += `&artist=${artist}`;
  }

  const URL = getURL(params, 1);

  try {
    const results = await axios.get(URL);

    let bio;

    if (artist) {
      bio = results.data[`${type}`].wiki.summary;
    } else {
      bio = results.data[`${type}`].bio.summary;
    }

    let startPosition = bio.indexOf('<a');

    bio = bio.replace(bio.slice(startPosition), '');

    if (bio.length > 100) {
      startPosition = bio.indexOf('.', 100);
      bio = bio.replace(bio.slice(startPosition), '');
    }

    if (bio.trim().length <= 10) {
      model.corrupt(true);
    }

    return bio;
  } catch (error) {
    return new Error('Your request cannot be done');
  }
};

module.exports = {
  getBio,
};
