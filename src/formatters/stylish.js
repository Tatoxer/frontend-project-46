import _ from 'lodash';

const makeIndent = (depth, spacesCount = 4, shiftToLeft = 2) => ' '.repeat(depth * spacesCount - shiftToLeft);

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = makeIndent(depth);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${indent}      ${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${indent}  }`,
    ].join('\n');
  };

  return iter(value, currentDepth);
};

const makeStylishFormat = (coll) => {
  const iter = (currentNode, depth) => {
    const indent = makeIndent(depth);

    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'changed':
          return [
            `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
            `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
          ].join('\n');
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;

        case 'removed':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;

        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;

        case 'nested':
          return `${indent}  ${node.key}: ${iter(node.children, depth + 1)}`;

        default:
          throw new Error(`${node.type} is unexpected`);
      }
    });

    return [
      '{',
      ...lines,
      `${makeIndent(depth, 4, 4)}}`,
    ].join('\n');
  };

  return iter(coll, 1);
};

export default makeStylishFormat;
