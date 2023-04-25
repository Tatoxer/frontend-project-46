import _ from 'lodash';

const buildDifference = (data1, data2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const packedTree = sortedKeys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }

    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, type: 'nested', children: buildDifference(data1[key], data2[key]) };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }

    return {
      key, type: 'changed', value1: data1[key], value2: data2[key],
    };
  });

  return packedTree;
};

export default buildDifference;
