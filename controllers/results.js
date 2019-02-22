const converter = require('number-to-words');

// Utils Imports
const { isValid } = require('./utils/validationUtils');
const { search } = require('./utils/requests/search');
const { getSearchMethod } = require('./utils/searching');
const { getOutput } = require('./utils/sanitizer');
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

    const output = await getOutput(searchResults, type, methods);

    const countInNumbers = output.length;
    const count = capitalizeFirstLetter(converter.toWords(countInNumbers));

    res.render('results', {
        title: 'Search Results',
        resultsPageIndicator,
        output,
        count,
        countInNumbers,
        noResults: output.length > 0 ? false : true
    });

}