import makePlainFormat from './plain.js';
import makeStylishFormat from './stylish.js';

const chooseFormatter = (formatter, objects) => {
  switch (formatter) {
    case 'plain':
      return makePlainFormat(objects);
    case 'json':
      return JSON.stringify(objects);
    case 'stylish':
      return makeStylishFormat(objects);
    default:
      throw new Error(`Formatter ${formatter}`);
  }
};

export default chooseFormatter;
