import _ from 'lodash';
import buildComparisonTreeArray from '../../scripts/compareObjects.js';
import getFixturePath from '../../scripts/getFixturePath.js';
import getJsonFile from '../../parsers/jsonParser.js';

let filePath = [];

const plainFormatter = (arrayObj) => {
  const iter = (array, depth = 0) => {
    const result = array.reduce((acc, obj) => {
      filePath.push(obj.name);
      if (obj.children.length > 0) {
        acc += iter(obj.children, depth + 1);
      }
      // // FIXME: добавить проверку на null, true, false
      const oldValue = _.isObject(obj.oldValue) ? '[complex value]' : obj.oldValue;
      const newValue = _.isObject(obj.newValue) ? '[complex value]' : obj.newValue;

      if (obj.status === 'removed') {
        acc += `Property '${filePath.join('.')}' was ${obj.status}\n`;
      }

      if (obj.status === 'added') {
        acc += `Property '${filePath.join('.')}' was ${obj.status} with value: '${newValue}'\n`;
      }

      if (obj.status === 'updated') {
        acc += `Property '${filePath.join('.')}' was ${obj.status}. From '${oldValue}' to '${newValue}'\n`;
      }

      filePath = filePath.slice(0, depth);
      return acc;
    }, '');
    return result;
  };
  return iter(arrayObj, 0);
};

const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
const diff = buildComparisonTreeArray(file1, file2);

console.log(plainFormatter(diff));
