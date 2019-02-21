const converter = require('number-to-words');

// Utils Imports
const { isValid, isRepeated } = require('./utils/validationUtils');
const { search } = require('./utils/requests/search');
const { getSearchMethod } = require('./utils/searching');
const { getObject } = require('./utils/sanitizer');
const { capitalizeFirstLetter } = require('./utils/general');
const resultsPageIndicator = true;

exports.postResults = async (req, res, next) => {

    // Inputs

    // artist, track or and album (Type)
    const type = req.body['search-type'];

    // specifices the proper API method to use (Method)
    const methods = getSearchMethod(type);

    // the user input -- with no spaces (Value)
    const value = encodeURIComponent(req.body['search-value']);

    // Input Validation
    if (!isValid(value)) {
        res.redirect('/');
    }

    const searchResults = await search(type, methods[0], value);

    const output = [];

    for (let index = 0; index < searchResults.length; index++) {

        if (isRepeated(output, searchResults[index].name)) {
            continue;
        }

        const selected = await getObject(searchResults[index], type, methods);

        if (!selected.corrupt)
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

    const countInNumbers = output.length;
    const count = capitalizeFirstLetter(converter.toWords(countInNumbers));

    res.render('results', {
        title: 'Search Results',
        resultsPageIndicator,
        searchResults: output,
        count,
        countInNumbers,
        noResults: output.length > 0 ? false : true
    });

}