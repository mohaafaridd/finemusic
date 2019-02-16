const converter = require('number-to-words');
const axios = require('axios');

const {
    isEmpty
} = require('validator');

const {
    getSearchMethod,
    getParams,
    getURL,
    getSearchProperty,
    getBio
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
    const params = getParams(searchType, searchMethod[0], searchValue);

    // Search Limit Results
    const limit = 10;

    // Final request link
    const searchAPIMethod = getURL(params, limit);

    const searchJSONResults = await axios.get(searchAPIMethod);

    const searchResultsArray = searchJSONResults.data.results[searchProperty][searchType];

    searchResults = [];

    let exact = 0;

    for (let index = 0; index < searchResultsArray.length; index++) {
        const obj = searchResultsArray[index];

        if (searchResults.filter(e => e.name === obj.name).length > 0) {
            continue;
        }

        const pushedObj = {
            name: obj.name,
            picture: obj.image[2]['#text']
        }

        if (isEmpty(pushedObj.picture))
            continue;

        if (pushedObj.name.includes(',') || pushedObj.name.includes('(') ||
            pushedObj.name.includes(')') || pushedObj.name.includes('&') ||
            pushedObj.name.includes(' and ') || pushedObj.name.includes('-') ||
            pushedObj.name.includes('as'))
            continue;

        if (searchType !== 'artist') {
            pushedObj['artist'] = obj.artist;
            pushedObj['bio'] = await getBio(pushedObj.name, searchMethod[1], searchType, pushedObj['artist']);
        } else {
            pushedObj['bio'] = await getBio(pushedObj.name, searchMethod[1], searchType);
        }

        searchResults.push(pushedObj);
    }

    const count = capitalizeFirstLetter(converter.toWords(searchResults.length));

    res.render('results', {
        resultsPageIndicator,
        searchResults,
        count,
        noResults: searchResults.length > 0 ? false : true
    });

}