const converter = require('number-to-words');

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const getCount = (value) => ({
  number: value,
  string: capitalizeFirstLetter(converter.toWords(value)),
});

module.exports = {
  getCount,
};
