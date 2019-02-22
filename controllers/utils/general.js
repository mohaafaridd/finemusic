const converter = require('number-to-words');

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const getCount = (value) => {
    return {
        'number': value,
        'string': capitalizeFirstLetter(converter.toWords(value))
    }
}

module.exports = {
    getCount
}