import _ from 'lodash';

const makeIndents = (identSize, spacesCount) => [' '.repeat(identSize), ' '.repeat(identSize - spacesCount)];

const stringify = (value, currentDepth, spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = depth * spacesCount;
    const [indent, bracketIndent] = makeIndents(indentSize, spacesCount);

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

const makeStylishFormat = (coll, spacesCount = 2) => {
  const iter = (currentNode, multiplierValue) => {
    const indentSize = multiplierValue * spacesCount;
    const [commonIndent, bracketIndent] = makeIndents(indentSize, spacesCount);

    const lines = currentNode.map((node) => {
      switch (node.type) {
        case 'changed':
          return [
            `${commonIndent}- ${node.key}: ${stringify(node.object1Value, multiplierValue)}`,
            `${commonIndent}+ ${node.key}: ${stringify(node.object2Value, multiplierValue)}`,
          ].join('\n');
        case 'added':
          return `${commonIndent}+ ${node.key}: ${stringify(node.object2Value, multiplierValue)}`;

        case 'removed':
          return `${commonIndent}- ${node.key}: ${stringify(node.object1Value, multiplierValue)}`;

        case 'unchanged':
          return `${commonIndent}  ${node.key}: ${stringify(node.object1Value, multiplierValue)}`;

        case 'nested':
          return `${commonIndent}  ${node.key}: ${iter(node.children, multiplierValue + 2)}`;

        default:
          throw new Error(`${node.type} is unexpected`);
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(coll, 1);
};

export default makeStylishFormat;
