import _ from 'lodash';
import buildComparisonTreeArray from '../../scripts/compareObjects.js';
import getFixturePath from '../../scripts/getFixturePath.js';
import getJsonFile from '../../parsers/jsonParser.js';

const plainFormatter = (array) => {
  const result = array.reduce((acc, obj) => {
    if (obj.children.length > 0) {
      acc += plainFormatter(obj.children);
    }
    // FIXME: добавить проверку на null, true, false
    if (obj.status === 'removed') {
      acc += `Property '${obj.name}' was ${obj.status}\n`;
    }

    if (obj.status === 'added') {
      const value = _.isObject(obj.newValue) ? '[complex value]' : obj.newValue;
      acc += `Property '${obj.name}' was ${obj.status} with value: '${value}'\n`;
    }

    if (obj.status === 'updated') {
      const oldValue = _.isObject(obj.oldValue) ? '[complex value]' : obj.oldValue;
      const newValue = _.isObject(obj.newValue) ? '[complex value]' : obj.newValue;
      acc += `Property '${obj.name}' was ${obj.status}. From '${oldValue}' to '${newValue}'\n`;
    }
    return acc;
  }, '');
  return result;
};

const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
const diff = buildComparisonTreeArray(file1, file2);

console.log(plainFormatter(diff));
