import plainFormatter from '../src/formatters/plain.js';
import jsonFormatter from '../src/formatters/json.js';
import stylish from '../src/formatters/stylish.js';

const chooseFormatter = (formatter, threeArray) => {
  switch (formatter) {
    case 'plain':
      return plainFormatter(threeArray);
    case 'json':
      return jsonFormatter(threeArray);
    default:
      return stylish(threeArray);
  }
};

export default chooseFormatter;
