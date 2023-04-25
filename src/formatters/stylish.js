import _ from 'lodash';

const makeIndents = (depth, spacesCount, shiftToLeft = 0) => ' '.repeat(depth * spacesCount - shiftToLeft);

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = makeIndents(depth, 4);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent}    ${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${indent}}`,
    ].join('\n');
  };

  return iter(value, currentDepth);
};

const makeStylishFormat = (coll) => {
  const iter = (currentNode, depth) => {
    const indent = makeIndents(depth, 4);
    const indentWithShift = makeIndents(depth, 4, 2);

    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'changed':
          return [
            `${indentWithShift}- ${node.key}: ${stringify(node.value1, depth)}`,
            `${indentWithShift}+ ${node.key}: ${stringify(node.value2, depth)}`,
          ].join('\n');
        case 'added':
          return `${indentWithShift}+ ${node.key}: ${stringify(node.value, depth)}`;

        case 'removed':
          return `${indentWithShift}- ${node.key}: ${stringify(node.value, depth)}`;

        case 'unchanged':
          return `${indent}${node.key}: ${stringify(node.value, depth)}`;

        case 'nested':
          return `${indent}${node.key}: ${iter(node.children, depth + 1)}`;

        default:
          throw new Error(`${node.type} is unexpected`);
      }
    });

    return [
      '{',
      ...lines,
      `${makeIndents(depth, 4, 4)}}`,
    ].join('\n');
  };

  return iter(coll, 1);
};

export default makeStylishFormat;
