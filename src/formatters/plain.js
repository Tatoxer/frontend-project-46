import _ from 'lodash';

const prepareObjValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const buildEnding = (status, oldValue, newValue) => {
  const preparedOldValue = prepareObjValue(oldValue);
  const preparedNewValue = prepareObjValue(newValue);

  switch (status) {
    case 'removed':
      return `was ${status}`;
    case 'added':
      return `was ${status} with value: ${preparedNewValue}`;
    case 'updated':
      return `was ${status}. From ${preparedOldValue} to ${preparedNewValue}`;
    default:
      return `was ${status}`;
  }
};

const plainFormatter = (arrayObj) => {
  const iter = (currentNode, nameChain) => {
    const lines = currentNode
      .filter((node) => {
        const { status, children } = node;
        return !(status === 'unchanged' && +_.isEmpty(children));
      })
      .flatMap((node) => {
        const {
          name, status, children, oldValue, newValue,
        } = node;

        const chain = (nameChain === '') ? name : nameChain.concat('.', name);

        if (!_.isEmpty(children)) {
          return iter(children, chain);
        }

        const phraseEnding = buildEnding(status, oldValue, newValue);
        return `Property '${chain}' ${phraseEnding}`;
      }).join('\n');
    return lines;
  };
  return iter(arrayObj, '');
};

export default plainFormatter;
