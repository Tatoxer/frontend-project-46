import _ from 'lodash';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from './getFixturePath.js';

const getSortedObject = (object) => {
  const sorted = _.toPairs(object).sort();
  return sorted.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export default getSortedObject;
