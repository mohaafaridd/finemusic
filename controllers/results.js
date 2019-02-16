const converter = require('number-to-words');
const axios = require('axios');

const {
    isEmpty
} = require('validator');

const {
    getSearchMethod,
    getURL,
    getSearchProperty
} = require('./utils/searching');

let searchResults = [];
const resultsPageIndicator = true;

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.postResults = async (req, res, next) => {

    // artist, track or and album
    const searchType = req.body['search-type'];

    // specifices the proper API method to use
    const searchMethod = getSearchMethod(searchType);

    // the user input
    const searchValue = req.body['search-value'];

    if (isEmpty(searchValue)) {
        res.redirect('/');
    }

    // API's component that carries the data
    const searchProperty = getSearchProperty(searchType);

    // List of used params in API specification
    const params = getURL(searchType, searchMethod, searchValue);

    // Search Limit Results
    const limit = 10;

    // Final request link
    const URL = `http://ws.audioscrobbler.com/2.0/${params}&limit=${limit}&format=json`;

    const JSONResults = await axios.get(URL);

    const resultsArray = JSONResults.data.results[searchProperty][searchType];

    searchResults = [];

    for (let index = 0; index < resultsArray.length; index++) {
        const obj = resultsArray[index];
        const pushedObj = {
            name: obj.name,
            picture: obj.image[2]['#text']
        }

        if (isEmpty(pushedObj.picture))
            continue;

        if (pushedObj.name.includes(',') || pushedObj.name.includes('(') || pushedObj.name.includes(')') || pushedObj.name.includes('&') || pushedObj.name.includes(' and '))
            continue;

        searchResults.push(pushedObj);
    }

    const count = capitalizeFirstLetter(converter.toWords(searchResults.length));

    res.render('results', {
        resultsPageIndicator,
        searchResults,
        count,
        noResults: searchResults.length > 0 ? false : true,
        URL
    });

}