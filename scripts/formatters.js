import _ from 'lodash';

const stylish = (obj) => {
  const objToArray = _.toPairs(obj);
  let formatted;
  formatted = objToArray.reduce((acc, [key, values]) => {
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
  }, '{\n');
  formatted += '}';
  return formatted;
};

export default stylish;
