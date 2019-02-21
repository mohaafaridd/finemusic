const converter = require('number-to-words');

// Utils Imports
const { isValid } = require('./utils/validationUtils');
const { search } = require('./utils/requests/search');
const { isEmpty } = require('validator');

const { getSearchMethod } = require('./utils/searching');

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
        // 2. Check if the name is repeated
        // 1. Get the sanitized object
        // 1.1 Get name
        // 1.2 Get best picture
        // 3. Push to output array

        // TODO | This has to be added to validation utils to check if the name is part of any other results string (results array, selected object name property)
        if (isRepeated(output, searchResults[index].name)) {
            continue;
        }

        // TODO | This has to be added to a file which sanitizes the results object
        const selected = getObject(searchResults[index]);

        // TODO | Push object to the results array
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