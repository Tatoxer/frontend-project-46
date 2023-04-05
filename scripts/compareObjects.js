import getFixturePath from './getFixturePath.js';
import getJsonFile from '../parsers/jsonParser.js';

const isObject = (elem) => typeof elem === 'object' && elem !== null;

const compareObjects = (object1, object2) => {
  const compareWithDepth = (obj1, obj2, depth = 2) => {
    const entries = Object.entries(obj1);
    const obj2Keys = Object.keys(obj2);

    // Добавляет разницу ключей и значений между obj1 и obj2
    const checkedObj1 = entries.flatMap(([key, value]) => {
      const array = [];

      // Если есть ключ и значение объект - делаем рекурсию
      if (Object.hasOwn(obj2, key) && isObject(value)) {
        if (!isObject(obj2[key])) {
          let elem = '{\n';
          elem += compareWithDepth(value, value, depth + 2);
          elem += `${' '.repeat(depth)}}`;
          array.push(`${' '.repeat(depth)}- ${key}: ${elem}\n`);
          array.push(`${' '.repeat(depth)}+ ${key}: ${obj2[key]}\n`);
        } else {
          array.push(`${' '.repeat(depth)}  ${key}: {\n`);
          array.push(compareWithDepth(value, obj2[key], depth + 2));
          array.push(`${' '.repeat(depth)}}\n`);
        }
      } else {
        // Если совпадают ключи и значения
        if (Object.hasOwn(obj2, key) && value === obj2[key]) {
          array.push(`${' '.repeat(depth)}  ${key}: ${value}\n`);
        }

        // Если есть ключ но не совпадают значения
        if (Object.hasOwn(obj2, key) && value !== obj2[key]) {
          array.push(`${' '.repeat(depth)}- ${key}: ${value}\n`);
          array.push(`${' '.repeat(depth)}+ ${key}: ${obj2[key]}\n`);
        }

        // Если нет ключа
        if (!Object.hasOwn(obj2, key)) {
          if (isObject(value)) {
            array.push(`${' '.repeat(depth)}- ${key}: {\n`);
            array.push(compareWithDepth(value, value, depth + 2));
            array.push(`${' '.repeat(depth)}}\n`);
          } else {
            array.push(`${' '.repeat(depth)}- ${key}: ${value}\n`);
          }
        }
      }
      return array;
    });

    // Добавляет остутсвующие ключи и значения в ob1 из obj2
    const checkedObj2 = obj2Keys.flatMap((key) => {
      const array = [];
      if (!Object.hasOwn(obj1, key)) {
        // Если ключ объект - делаем рекурсию
        if (isObject(obj2[key])) {
          array.push(`${' '.repeat(depth)}  ${key}: {\n`);
          array.push(compareWithDepth(obj2[key], obj2[key], depth + 2));
          array.push(`${' '.repeat(depth)}}\n`);
        } else {
          // Если ключа нет - добавляем его со знаком '+'
          array.push(`${' '.repeat(depth)}+ ${key}: ${obj2[key]}\n`);
        }
      }
      return array;
    });

    return [...checkedObj1, ...checkedObj2];
  };

  return compareWithDepth(object1, object2, 2);
};
export default compareObjects;

const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
const file2 = getJsonFile(getFixturePath('fileDeep2.json'));

const difference = compareObjects(file1, file2);
console.log(['{\n', ...difference, '}'].join(''));
