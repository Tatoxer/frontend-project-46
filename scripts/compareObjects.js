import getFixturePath from './getFixturePath.js';
import getJsonFile from '../parsers/jsonParser.js';
import isObject from './isObject.js';

const compareObjects = (object1, object2) => {
  const compareWithDepth = (obj1, obj2, depth = 2) => {
    const entries = Object.entries(obj1);
    const obj2Keys = Object.keys(obj2);
    const checkedObj1 = entries.reduce((acc, [key, value]) => {
      // Рекурсия
      if (isObject(value) && isObject(obj2[key])) {
        acc[key] = [(compareWithDepth(value, obj2[key], depth + 2)), depth, 'unchanged', ''];
      } else {
        // Если совпадают ключи и значения
        if (Object.hasOwn(obj2, key) && value === obj2[key]) {
          acc[key] = [value, depth, 'unchanged', ''];
        }

        // Если есть ключ но не совпадают значения
        if (Object.hasOwn(obj2, key) && value !== obj2[key]) {
          acc[key] = [value, depth, 'changed', obj2[key]];
        }

        // Если нет ключа
        if (!Object.hasOwn(obj2, key)) {
          if (isObject(value)) {
            acc[key] = [(compareWithDepth(value, value, depth + 2)), depth, 'removed', ''];
          } else {
            acc[key] = [value, depth, 'removed', ''];
          }
        }
      }
      return acc;
    }, {});

    const checkedObj2 = obj2Keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key) && isObject(obj2[key])) {
        acc[key] = [compareWithDepth(obj2[key], obj2[key], depth + 4), depth, 'added', ''];
      } else if (!Object.hasOwn(obj1, key)) {
        acc[key] = [obj2[key], depth, 'added', ''];
      }

      return acc;
    }, {});
    return Object.assign(checkedObj1, checkedObj2);
  };
  return compareWithDepth(object1, object2);
};
export default compareObjects;

// const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
// const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
//
// console.log(compareObjects(file1, file2));
// console.log(JSON.stringify(compareObjects(file1, file2)));
