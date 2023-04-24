import _ from 'lodash';

const buildObjectsComparisonTree = (object1, object2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const packedTree = sortedKeys.map((key) => {
    if (Object.hasOwn(object1, key) && !Object.hasOwn(object2, key)) {
      return { key, type: 'removed', object1Value: object1[key] };
    }

    if (Object.hasOwn(object2, key) && !Object.hasOwn(object1, key)) {
      return { key, type: 'added', object2Value: object2[key] };
    }

    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return { key, type: 'nested', children: buildObjectsComparisonTree(object1[key], object2[key]) };
    }

    if (_.isEqual(object1[key], object2[key])) {
      return { key, type: 'unchanged', object1Value: object1[key] };
    }

    return {
      key, type: 'changed', object1Value: object1[key], object2Value: object2[key],
    };
  });

  return packedTree;
};

export default buildObjectsComparisonTree;
