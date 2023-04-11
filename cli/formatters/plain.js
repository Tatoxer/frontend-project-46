import _ from 'lodash';
import buildComparisonTreeArray from '../../scripts/compareObjects.js';
import getFixturePath from '../../scripts/getFixturePath.js';
import getJsonFile from '../../parsers/jsonParser.js';

const getObjValue = (objParameter) => {
  const checkValues = ['[complex value]', null, true, false];
  const value = _.isObject(objParameter) ? '[complex value]' : objParameter;
  return checkValues.includes(value) ? value : `'${value}'`;
};

const plainFormatter = (arrayObj) => {
  let filePath = [];

  const iter = (array, depth = 0) => {
    const result = array.reduce((acc, obj) => {
      filePath.push(obj.name);
      const oldValue = getObjValue(obj.oldValue);
      const newValue = getObjValue(obj.newValue);

      if (obj.children.length > 0) {
        acc += iter(obj.children, depth + 1);
      }
      // // FIXME: добавить проверку на null, true, false

      if (obj.status === 'removed') {
        acc += `Property '${filePath.join('.')}' was ${obj.status}\n`;
      }

      if (obj.status === 'added') {
        acc += `Property '${filePath.join('.')}' was ${obj.status} with value: ${newValue}\n`;
      }

      if (obj.status === 'updated') {
        acc += `Property '${filePath.join('.')}' was ${obj.status}. From ${oldValue} to ${newValue}\n`;
      }

      filePath = filePath.slice(0, depth);
      return acc;
    }, '');
    return result;
  };
  return iter(arrayObj, 0);
};

export default plainFormatter;
// const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
// const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
// const diff = buildComparisonTreeArray(file1, file2);
//
// console.log(plainFormatter(diff));
