import _ from 'lodash';

const prepareObjValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const buildEnding = (status, valueBefore, valueAfter) => {
  const preparedBeforeValue = prepareObjValue(valueBefore);
  const preparedAfterValue = prepareObjValue(valueAfter);

  switch (status) {
    case 'removed':
      return `was ${status}`;
    case 'added':
      return `was ${status} with value: ${preparedAfterValue}`;
    case 'updated':
      return `was ${status}. From ${preparedBeforeValue} to ${preparedAfterValue}`;
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
          name, status, children, valueBefore, valueAfter,
        } = node;

        const chain = (nameChain === '') ? name : nameChain.concat('.', name);

        if (!_.isEmpty(children)) {
          return iter(children, chain);
        }

        const phraseEnding = buildEnding(status, valueBefore, valueAfter);
        return `Property '${chain}' ${phraseEnding}`;
      }).join('\n');
    return lines;
  };
  return iter(arrayObj, '');
};

export default plainFormatter;
