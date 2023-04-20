import _ from 'lodash';

const buildObjectsComparisonTree = (object1, object2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  const packedTree = sortedKeys.map((key) => {
    const object1Value = object1[key];
    const object2Value = object2[key];

    // И я все равно не понимаю как тут сократить колличество if
    // Тут мы проверяем наличие ключа в обоих объектах
    if (Object.hasOwn(object1, key) && Object.hasOwn(object2, key)) {
      if (_.isPlainObject(object1Value) && _.isPlainObject(object2Value)) {
        return { key, type: 'unchanged', children: buildObjectsComparisonTree(object1Value, object2Value) };
      }

      if (_.isEqual(object1Value, object2Value)) {
        return { key, type: 'unchanged', object1Value };
      }

      return {
        key, type: 'updated', object1Value, object2Value,
      };
    }

    // Если ключа нет в обоих объектах - то сперва идет проверка наличия ключа в первом объекте
    if (Object.hasOwn(object1, key)) {
      return { key, type: 'removed', object1Value };
    }

    // Затем во втором, вроде и так все минималистично
    if (Object.hasOwn(object2, key)) {
      return { key, type: 'added', object2Value };
    }

    throw new Error('If you see this message, perhaps there is a problem in the program code. Check it');
  });

  return packedTree;
};

export default buildObjectsComparisonTree;
