const axios = require('axios');

const { getParams, getURL } = require('./../URLGrabber');
const { getSearchProperty } = require('./../searching');


const search = async (type, method, value) => {
  // API's component that carries the data
  const searchProperty = getSearchProperty(type);

  // List of used params in API specification
  const params = getParams(type, method, value);

  // Search Limit Results
  const limit = 10;

  // Final request link
  const URL = getURL(params, limit);

  const JSONResults = await axios.get(URL);

  const results = JSONResults.data.results[searchProperty][type];

  return results;
};

module.exports = {
  search,
};
