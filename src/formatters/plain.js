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

        if (node.children) {
          return iter(node.children, chain);
        }

        const preparedObject1Value = stringify(node.object1Value);
        const preparedObject2Value = stringify(node.object2Value);

        switch (node.type) {
          case 'removed':
            return `Property '${chain}' was ${node.type}`;
          case 'added':
            return `Property '${chain}' was ${node.type} with value: ${preparedObject2Value}`;
          case 'updated':
            return `Property '${chain}' was ${node.type}. From ${preparedObject1Value} to ${preparedObject2Value}`;
          case 'unchanged':
            return '';
          default:
            throw new Error(`Unknown type "${node.type}"`);
        }
      });
    return lines.filter((elem) => elem !== '').join('\n');
  };
  return iter(objects, '');
};

export default makePlainFormat;
