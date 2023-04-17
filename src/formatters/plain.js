import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const plainFormatter = (arrayObj) => {
  const iter = (currentNode, nameChain) => {
    const lines = currentNode
      .filter((node) => !(node.changes === 'unchanged' && _.isEmpty(node.children)))
      .flatMap((node) => {
        const {
          name, changes, children, valueBefore, valueAfter,
        } = node;

        const chain = (nameChain === '') ? name : nameChain.concat('.', name);

        if (children) {
          return iter(children, chain);
        }
        const preparedBeforeValue = stringify(valueBefore);
        const preparedAfterValue = stringify(valueAfter);

        switch (changes) {
          case 'removed':
            return `Property '${chain}' was ${changes}`;
          case 'added':
            return `Property '${chain}' was ${changes} with value: ${preparedAfterValue}`;
          case 'updated':
            return `Property '${chain}' was ${changes}. From ${preparedBeforeValue} to ${preparedAfterValue}`;
          default:
            return `Property '${chain}' was ${changes}`;
        }
      }).join('\n');
    return lines;
  };
  return iter(arrayObj, '');
};

export default plainFormatter;
