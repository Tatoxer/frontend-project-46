import _ from 'lodash';
import isObject from './isObject.js';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from './getFixturePath.js';
import compareObjects from './compareObjects.js';

const stylish = (obj) => {
  const flatted = Object.entries(obj);
  console.log(flatted);
  // console.log(`KEY - ${flatted[0]}`, typeof flatted[0]);
  // console.log(`VALUE - ${flatted[1]}`, typeof flatted[1]);
  console.log('-'.repeat(20));
  const formatted = flatted.reduce((acc, [key, values]) => {
    console.log(`KEY - ${key}`, typeof key);
    console.log(`VALUE - ${values}`, typeof values);
    console.log('.');
    const [value, depth, status, newValue] = values;
    if (isObject(value)) {
      acc += `${' '.repeat(depth)}${key}: {\n`;
      acc += stylish(value);
      acc += `${' '.repeat(depth)}}\n`;
    } else {
      switch (status) {
        case 'unchanged':
          acc += `${' '.repeat(depth)}  ${key}: ${value}\n`;
          break;
        case 'removed':
          acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
          break;
        case 'added':
          acc += `${' '.repeat(depth)}+ ${key}: ${value}\n`;
          break;
        case 'changed':
          acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
          acc += `${' '.repeat(depth)}+ ${key}: ${newValue}\n`;
          break;
        default:
          return undefined;
      }
    }

    return acc;
  }, '');
  return formatted;
};

// export default stylish;

const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
const diff = compareObjects(file1, file2);

console.log(JSON.stringify(diff));
// console.log(diff);
const formatted = stylish(diff);
console.log(formatted);
