const {
    isEmpty,
    isAlphanumeric
} = require('validator');

const emptyString = (value) => {
    return isEmpty(value);
}

const notEnglishInput = (value) => {
    return !isAlphanumeric(value);
}

const isValid = (value) => {
    if(emptyString(value)){
        return false;
    }
    
    if(notEnglishInput(value)){
        return false;
    }

    // escape case
    return true;
}

module.exports = {
    isValid
};