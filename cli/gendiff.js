import _ from 'lodash';
import getSortedObject from '../scripts/getSortedObject.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import getYamlFile from '../parsers/yamlParser.js';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from '../scripts/getFixturePath.js';
import compareObjects2 from '../scripts/compareObjects.js';

// FIXME: поправить форматтер (линтер)
const jsonFormater = (obj) => {
  const objToArray = _.toPairs(obj);
  return objToArray.reduce((acc, [key, values]) => {
    const [value, depth, status, newValue] = [...values];
    switch (status) {
      case 'unchanged':
        // eslint-disable-next-line no-param-reassign
        acc += `${' '.repeat(depth)}  ${key}: ${value}\n`;
        break;
      case 'removed':
        // eslint-disable-next-line no-param-reassign
        acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
        break;
      case 'added':
        // eslint-disable-next-line no-param-reassign
        acc += `${' '.repeat(depth)}+ ${key}: ${value}\n`;
        break;
      case 'changed':
        // eslint-disable-next-line no-param-reassign
        acc += `${' '.repeat(depth)}- ${key}: ${value}\n`;
        // eslint-disable-next-line no-param-reassign
        acc += `${' '.repeat(depth)}+ ${key}: ${newValue}\n`;
        break;
      default:
        return undefined;
    }
    return acc;
  }, '');
};

const genDiff = (filePath1, filePath2) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const fileExtension = getFileExtension(path1);
  let file1;
  let file2;
  // FIXME: сортировку проводить на результирующем объекте
  switch (fileExtension) {
    case '.json':
      file1 = getJsonFile(path1);
      file2 = getJsonFile(path2);
      break;
    case '.yaml':
      file1 = getYamlFile(path1);
      file2 = getYamlFile(path2);
      break;
    case '.yml':
      file1 = getYamlFile(path1);
      file2 = getYamlFile(path2);
      break;
    default:
      return null;
  }

  const difference = compareObjects2(file1, file2);
  const sortedDifference = getSortedObject(difference);
  return jsonFormater(sortedDifference);
};

// export default genDiff;

const file1 = getFixturePath('file1.json');
const file2 = getFixturePath('file2.json');

console.log(genDiff(file1, file2));
