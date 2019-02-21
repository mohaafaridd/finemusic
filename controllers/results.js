const converter = require('number-to-words');
const validator = require('validator');
const axios = require('axios');

const {
    isEmpty
} = require('validator');

const {
    getSearchMethod,
    getParams,
    getURL,
    getSearchProperty,
    getBio,
    getTopSongs
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
    // the user input -- with no spaces
    const searchValue = req.body['search-value'].replace(/\s/g, "+");


    //TODO Validation
    //// 1 - Empty Text
    //// 2 - English Only 

    if (isEmpty(searchValue)) {
        res.redirect('/');
    }

    if(!validator.isAlphanumeric(searchValue)){
        console.log(searchValue);
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
            picture: obj.image[3]['#text']
        }

        if (isEmpty(pushedObj.picture))
        {
            pushedObj.picture = obj.image[2]['#text'];
        };

        if (isEmpty(pushedObj.picture))
        {
            pushedObj.picture = obj.image[1]['#text'];
        };

        if (isEmpty(pushedObj.picture))
        {
            pushedObj.picture = obj.image[0]['#text'];
        };

        if (isEmpty(pushedObj.picture))
        {
            continue;
        };

        if (pushedObj.name.includes(',') || pushedObj.name.includes('(') ||
            pushedObj.name.includes(')') || pushedObj.name.includes('&') ||
            pushedObj.name.includes(' and ') || pushedObj.name.includes('-') ||
            pushedObj.name.includes('as') || pushedObj.name.includes('feat') ||
            pushedObj.name.includes('ft'))
            continue;

        if (searchType !== 'artist') {
            pushedObj['artist'] = obj.artist;
            pushedObj['bio'] = await getBio(searchType, searchMethod[1], pushedObj.name, pushedObj['artist']);
        } else {
            pushedObj['bio'] = await getBio(searchType, searchMethod[1], pushedObj.name);
            pushedObj['songs'] = await getTopSongs('artist', searchMethod[2], obj.name);
        }

        searchResults.push(pushedObj);
    }

    const count = capitalizeFirstLetter(converter.toWords(searchResults.length));

    res.render('results', {
        title: 'Search Results',
        resultsPageIndicator,
        searchResults,
        count,
        noResults: searchResults.length > 0 ? false : true
    });

}