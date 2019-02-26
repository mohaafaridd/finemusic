const {
  isEmpty,
  contains,
} = require('validator');

const emptyString = value => isEmpty(value);

const isValid = (value) => {
  if (emptyString(value)) {
    return false;
  }

  // escape case
  return true;
};

/* Used to check for if name is repeated in array */
const isRepeated = (array, string) => {
  if (array.length > 0) {
    for (let index = 0; index < array.length; index += 1) {
      const element = array[index];

      if (contains(string.toLowerCase(), element.name.toLowerCase())) {
        return true;
      }
    }
  }

  return false;
};

module.exports = {
  isValid,
  isRepeated,
};
