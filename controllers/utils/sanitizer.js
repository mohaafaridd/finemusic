
const { getOrder, setOrder } = require('./order');
const { getObject } = require('./extractors');


const getOutput = async (input, type, methods) => {
  const output = [];

  const order = getOrder(input);

  // I don't really understand this to the fullest.
  await Promise.all(order.map(async (selected) => {
    const obj = await getObject(selected, type, methods);

    const isArtist = type === 'artist';

    obj.isArtist = isArtist;

    if (obj.corrupt === false) {
      output.push(obj);
    }
  }));

  return setOrder(output, order);
};

module.exports = {
  getOutput,
};
