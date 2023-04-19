import _ from 'lodash';

const buildComparisonTreeArray = (object1, object2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const packedTree = sortedKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return { name: key, changes: 'unchanged', children: buildComparisonTreeArray(value1, value2) };
      }

      if (_.isEqual(value1, value2)) {
        return {
          name: key, changes: 'unchanged', valueBefore: value1, valueAfter: value1,
        };
      }

      return {
        name: key, changes: 'updated', valueBefore: value1, valueAfter: value2,
      };
    }

    if (Object.hasOwn(object1, key)) {
      return { name: key, changes: 'removed', valueBefore: value1 };
    }

    if (Object.hasOwn(object2, key)) {
      return { name: key, changes: 'added', valueAfter: value2 };
    }

    throw new Error('If you see this message, perhaps there is a problem in the program code. Check it');
  });

  return packedTree;
};

export default buildComparisonTreeArray;
