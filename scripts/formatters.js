import _ from 'lodash';
import isObject from './isObject.js';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from './getFixturePath.js';
import compareObjects from './compareObjects.js';

const stylish = (obj) => {
  const flatted = Object.entries(obj);
  // console.log(key);
  // console.log(values);
  const formatted = flatted.reduce((acc, [key, values]) => {
    const [value, depth, status, newValue] = values;
    if (isObject(value)) {
      acc += stylish(value);
    }
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
    return acc;
  }, '');
  return formatted;

  // const formatted = objToArray.reduce((acc, elem) => {
  //   console.log(elem);
  //   if (isObject(elem[1])) {
  //     acc += stylish(elem[1]);
  //   }
  //   const key = elem[0];
  //   const [value, depth, status, newValue] = elem[1];
  //   switch (status) {
  //     case 'unchanged':
  //       acc += `${' '.repeat(depth)}  ${key}: ${value}\n`;
  //       break;
  //     case 'removed':
  //       acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
  //       break;
  //     case 'added':
  //       acc += `${' '.repeat(depth)}+ ${key}: ${value}\n`;
  //       break;
  //     case 'changed':
  //       acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
  //       acc += `${' '.repeat(depth)}+ ${key}: ${newValue}\n`;
  //       break;
  //     default:
  //       return undefined;
  //   }
  //   // console.log(elem[0]);
  //   // console.log(elem[1]);
  //   // console.log('-'.repeat(20));
  //
  //   return acc;
  // }, '');

  // console.log(objToArray);
  // console.log(objToArray.flat());
  // console.log(`KEY - ${key}`);
  // console.log(`Value - ${value}`);

  // return formatted;
};
// const stylishBackup = (obj) => {
//   const objToArray = _.toPairs(obj);
//
//   const formatted = objToArray.reduce((acc, [key, values]) => {
//     console.log(`KEY - ${key}: VALUE - ${[values]}`);
//
//     const [value, depth, status, newValue] = [...values];
//     if (isObject(value)) {
//       console.log(value);
//       acc += stylishBackup(values);
//     }
//
//     switch (status) {
//       case 'unchanged':
//         acc += `${' '.repeat(depth)}  ${key}: ${value}\n`;
//         break;
//       case 'removed':
//         acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
//         break;
//       case 'added':
//         acc += `${' '.repeat(depth)}+ ${key}: ${value}\n`;
//         break;
//       case 'changed':
//         acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
//         acc += `${' '.repeat(depth)}+ ${key}: ${newValue}\n`;
//         break;
//       default:
//         return undefined;
//     }
//     return acc;
//   }, '{\n');
//   formatted += '}';
//   return formatted;
// };

// export default stylish;

const file1 = getJsonFile(getFixturePath('fileDeep3.json'));
const file2 = getJsonFile(getFixturePath('fileDeep4.json'));
const diff = compareObjects(file1, file2);

// console.log(JSON.stringify(diff));
// console.log(diff);
const formatted = stylish(diff);
console.log(formatted);
