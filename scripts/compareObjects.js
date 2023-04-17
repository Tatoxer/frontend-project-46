import _ from 'lodash';

const initTree = (name, changes, children = [], valueBefore = '', valueAfter = '') => ({
  name,
  changes,
  children,
  valueBefore,
  valueAfter,
});

const buildComparisonTreeArray = (object1, object2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const packedTree = sortedKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 === undefined && value2 === undefined) {
      return new Error('If you see this message, perhaps there is a problem in program code. Check object values');
    }

    if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return initTree(key, 'unchanged', buildComparisonTreeArray(value1, value2), '', '');
      }

      if (_.isEqual(value1, value2)) {
        return initTree(key, 'unchanged', [], value1, value1);
      }

      return initTree(key, 'updated', [], value1, value2);
    }

    if (Object.hasOwn(object1, key)) {
      return initTree(key, 'removed', [], value1, '');
    }

    if (Object.hasOwn(object2, key)) {
      return initTree(key, 'added', [], '', value2);
    }

    throw new Error('If you see this message, perhaps there is a problem in the program code. Check it');
  });

  return packedTree;
};

export default buildComparisonTreeArray;
