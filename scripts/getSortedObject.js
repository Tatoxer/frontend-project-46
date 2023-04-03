import _ from 'lodash';

const getSortedObject = (object) => {
  const sorted = _.toPairs(object).sort();
  return sorted.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

export default getSortedObject;
