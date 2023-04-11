import _ from 'lodash';
import getFixturePath from '../../scripts/getFixturePath.js';
import getJsonFile from '../../parsers/jsonParser.js';
import compareObjects from '../../scripts/compareObjects.js';

const stringify = (value, currentDepth, replacer = ' ', spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const indent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent}  ${key}: ${iter(val, depth + 2)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, currentDepth + spacesCount);
};

export const stylish = (coll, replacer = ' ', spacesCount = 2) => {
  const iter = (currentNode, depth) => {
    const indentSize = depth * spacesCount;
    const commonIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentNode.map((node) => {
      const {
        name, status, children, oldValue, newValue,
      } = node;

      const oldValueAsString = stringify(oldValue, depth);
      const newValueAsString = stringify(newValue, depth);

      if (children.length > 0) {
        return `${commonIndent}  ${name}: ${iter(children, depth + 2)}`;
      }

      if (status === 'updated') {
        return `${commonIndent}- ${name}: ${oldValueAsString}`
          + '\n'
          + `${commonIndent}+ ${name}: ${newValueAsString}`;
      }

      if (status === 'added') {
        return `${commonIndent}+ ${name}: ${newValueAsString}`;
      }
      if (status === 'removed') {
        return `${commonIndent}- ${name}: ${oldValueAsString}`;
      }

      // If nothing changed
      return `${commonIndent}  ${name}: ${oldValueAsString}`;
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(coll, 1);
};

export default stylish;

const file1 = getJsonFile(getFixturePath('file1.json'));
const file2 = getJsonFile(getFixturePath('file2.json'));
const diff = compareObjects(file1, file2);

// const formatted = stylish(diff);
// console.log(formatted);
// console.log(diff);
