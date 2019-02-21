const {
    isEmpty,
    contains
} = require('validator');

const emptyString = (value) => {
    return isEmpty(value);
}

/* const notEnglishInput = (value) => {

    var regexp = /[A-z\u00C0-\u00ff]+/g;

    return !regexp.test(value);
} */

const isValid = (value) => {
    if (emptyString(value)) {
        return false;
    }

    // escape case
    return true;
}

/* Used to check for if name is repeated in array */
const isRepeated = (array, string) => {

    if (array.length > 0) {

        for (let index = 0; index < array.length; index++) {
            const element = array[index];

            if (contains(string, element.name))
                return true;
        }

    }

    return false;
}

module.exports = {
    isValid,
    isRepeated
};