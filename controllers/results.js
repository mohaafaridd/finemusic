const converter = require('number-to-words');

// Utils Imports
const { isValid, isRepeated } = require('./utils/validationUtils');
const { search } = require('./utils/requests/search');
const { getSearchMethod } = require('./utils/searching');
const { getObject } = require('./utils/sanitizer');
const { contains } = require('validator');

const resultsPageIndicator = true;

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.postResults = async (req, res, next) => {

    // Inputs

    // artist, track or and album (Type)
    const type = req.body['search-type'];
    // specifices the proper API method to use (Method)
    const methods = getSearchMethod(type);
    // the user input -- with no spaces (Value)
    const value = req.body['search-value'].replace(/\s/g, "+");

    // Input Validation
    if (!isValid(value)) {
        res.redirect('/');
    }

    const searchResults = await search(type, methods[0], value);

    const output = [];


    for (let index = 0; index < searchResults.length; index++) {


        // TODO
        //// 1. Check if the name is repeated
        //// 2. Get the sanitized object
        //// 2.1 Get name
        //// 2.2 Get best picture
        //// 3. Push to output array

        if (isRepeated(output, searchResults[index].name)) {
            continue;
        }

        const selected = getObject(searchResults[index]);
        output.push(selected);

        /* if (type !== 'artist') {
            pushedObj['artist'] = obj.artist;
            pushedObj['bio'] = await getBio(type, methods[1], pushedObj.name, pushedObj['artist']);
        } else {
            pushedObj['bio'] = await getBio(type, methods[1], pushedObj.name);
            pushedObj['songs'] = await getTopSongs('artist', methods[2], obj.name);
        } */

        /* searchResults.map(e => e.name !== obj.name);

        searchResults.push(pushedObj); */
    }

    const count = capitalizeFirstLetter(converter.toWords(searchResults.length));

    res.render('results', {
        title: 'Search Results',
        resultsPageIndicator,
        searchResults: output,
        count,
        noResults: output.length > 0 ? false : true
    });

}