import _ from 'lodash';

const prepareObjValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;

  return value;
};

const buildEnding = (changes, valueBefore, valueAfter) => {
  const preparedBeforeValue = prepareObjValue(valueBefore);
  const preparedAfterValue = prepareObjValue(valueAfter);

  switch (changes) {
    case 'removed':
      return `was ${changes}`;
    case 'added':
      return `was ${changes} with value: ${preparedAfterValue}`;
    case 'updated':
      return `was ${changes}. From ${preparedBeforeValue} to ${preparedAfterValue}`;
    default:
      return `was ${changes}`;
  }
};

const plainFormatter = (arrayObj) => {
  const iter = (currentNode, nameChain) => {
    const lines = currentNode
      .filter((node) => {
        const { changes, children } = node;
        return !(changes === 'unchanged' && +_.isEmpty(children));
      })
      .flatMap((node) => {
        const {
          name, changes, children, valueBefore, valueAfter,
        } = node;

        const chain = (nameChain === '') ? name : nameChain.concat('.', name);

        if (!_.isEmpty(children)) {
          return iter(children, chain);
        }

        const phraseEnding = buildEnding(changes, valueBefore, valueAfter);
        return `Property '${chain}' ${phraseEnding}`;
      }).join('\n');
    return lines;
  };
  return iter(arrayObj, '');
};

export default plainFormatter;
