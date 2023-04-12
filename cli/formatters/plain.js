import _ from 'lodash';

const getObjValue = (objParameter) => {
  const value = _.isObject(objParameter) ? '[complex value]' : objParameter;
  return typeof value === 'string' && value !== '[complex value]' ? `'${value}'` : value;
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
  return iter(arrayObj, 0).trimEnd();
};

export default plainFormatter;
