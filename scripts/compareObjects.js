import getFixturePath from './getFixturePath.js';
import getJsonFile from '../parsers/jsonParser.js';

const isObject = (elem) => typeof elem === 'object' && elem !== null;

const compareObjects = (object1, object2) => {
  const compareWithDepth = (obj1, obj2, depth = 2) => {
    const entries = Object.entries(obj1);
    const obj2Keys = Object.keys(obj2);
    const checkedObj1 = entries.reduce((acc, [key, value]) => {
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
        acc[key] = [value, depth, 'removed', ''];
      }
      return acc;
    }, {});

    const checkedObj2 = obj2Keys.reduce((acc, key) => {
      if (!Object.hasOwn(obj1, key)) {
        acc[key] = [obj2[key], depth, 'added', ''];
      }
      return acc;
    }, {});
    return Object.assign(checkedObj1, checkedObj2);
  };
  return compareWithDepth(object1, object2);
};
export default compareObjects;

// const file1 = getJsonFile(getFixturePath('file1.json'));
// const file2 = getJsonFile(getFixturePath('file2.json'));
//
// console.log(compareObjects(file1, {}));
