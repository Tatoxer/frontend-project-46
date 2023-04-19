import _ from 'lodash';

const makeIndents = (identSize, spacesCount) => [' '.repeat(identSize), ' '.repeat(identSize - spacesCount)];

const stringify = (value, currentDepth, spacesCount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
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
  const iter = (currentNode, depth) => {
    const indentSize = depth * spacesCount;
    const [commonIndent, bracketIndent] = makeIndents(indentSize, spacesCount);

    const lines = currentNode.map((node) => {
      const object1ValueAsString = stringify(node.object1Value, depth);
      const object2ValueAsString = stringify(node.object2Value, depth);

      if (node.children) {
        return `${commonIndent}  ${node.key}: ${iter(node.children, depth + 2)}`;
      }

      switch (node.type) {
        case 'updated':
          return [
            `${commonIndent}- ${node.key}: ${object1ValueAsString}`,
            `${commonIndent}+ ${node.key}: ${object2ValueAsString}`,
          ].join('\n');
        case 'added':
          return `${commonIndent}+ ${node.key}: ${object2ValueAsString}`;
        case 'removed':
          return `${commonIndent}- ${node.key}: ${object1ValueAsString}`;
        default:
          return `${commonIndent}  ${node.key}: ${object1ValueAsString}`;
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
