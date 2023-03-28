import _ from 'lodash';

const getSortedJSON = (json) => {
  const sorted = _.toPairs(json).sort();
  return sorted.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export default getSortedJSON;
