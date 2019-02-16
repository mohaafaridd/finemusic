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

let people = [];
const results = true;

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

    const results = await axios.get(URL);
    console.log('results length', results.data.results[searchProperty][searchType].length);

    people = [];

    for (let index = 0; index < results.data.results[searchProperty][searchType].length; index++) {
        const obj = results.data.results[searchProperty][searchType][index];
        const pushedObj = {
            name: obj.name,
            picture: obj.image[2]['#text']
        }

        if (isEmpty(pushedObj.picture))
            continue;

        if (pushedObj.name.includes(',') || pushedObj.name.includes('('), pushedObj.name.includes('&'))
            continue;

        people.push(pushedObj);
    }

    const count = capitalizeFirstLetter(converter.toWords(people.length));

    res.render('results', {
        results,
        people,
        count,
        noResults: people.length > 0 ? false : true,
        URL
    });

}