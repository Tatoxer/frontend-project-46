import _ from 'lodash';

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

const stylish = (coll, replacer = ' ', spacesCount = 2) => {
  const iter = (currentNode, depth) => {
    const indentSize = depth * spacesCount;
    const commonIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = currentNode.map((node) => {
      const beforeValueAsString = stringify(node.valueBefore, depth);
      const afterValueAsString = stringify(node.valueAfter, depth);

      if (node.children) {
        return `${commonIndent}  ${node.name}: ${iter(node.children, depth + 2)}`;
      }

      switch (node.changes) {
        case 'updated':
          return `${commonIndent}- ${node.name}: ${beforeValueAsString}`
            + '\n'
            + `${commonIndent}+ ${node.name}: ${afterValueAsString}`;
        case 'added':
          return `${commonIndent}+ ${node.name}: ${afterValueAsString}`;
        case 'removed':
          return `${commonIndent}- ${node.name}: ${beforeValueAsString}`;
        default:
          return `${commonIndent}  ${node.name}: ${beforeValueAsString}`;
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

export default stylish;
