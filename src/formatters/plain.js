import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const makePlainFormat = (objects) => {
  const iter = (currentNode, nameChain) => {
    const lines = currentNode
      .flatMap((node) => {
        const chain = (nameChain === '') ? node.key : nameChain.concat('.', node.key);

        switch (node.type) {
          case 'removed':
            return `Property '${chain}' was ${node.type}`;

          case 'added':
            return `Property '${chain}' was ${node.type} with value: ${stringify(node.value)}`;

          case 'changed':
            return `Property '${chain}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;

          case 'unchanged':
            return null;

          case 'nested':
            return iter(node.children, chain);

          default:
            throw new Error(`Unknown type "${node.type}"`);
        }
      });
    return lines.filter((elem) => elem !== null).join('\n');
  };
  return iter(objects, '');
};

export default makePlainFormat;
