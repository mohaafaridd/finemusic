const { isRepeated } = require('./validationUtils');

const getOrder = (array) => {
  const output = [];
  for (let index = 0; index < array.length; index += 1) {
    const element = array[index];
    if (!isRepeated(output, element.name)) {
      output.push(element);
    }
  }
  return output;
};

const setOrder = (array, order) => {
  const output = [];

  for (let i = 0; i < order.length; i += 1) {
    const orderedItem = order[i];

    for (let j = 0; j < array.length; j += 1) {
      const unorderedItem = array[j];

      if (Object.is(orderedItem.name, unorderedItem.name)) {
        output.push(unorderedItem);
      }
    }
  }

  return output;
};

module.exports = {
  getOrder,
  setOrder,
};
