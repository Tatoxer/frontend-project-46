import parseFile from './parser.js';
import buildDifference from './buildDifference.js';
import chooseFormatter from './formatters/index.js';

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const fileContent1 = parseFile(filePath1);
  const fileContent2 = parseFile(filePath2);

  const difference = buildDifference(fileContent1, fileContent2);

  return chooseFormatter(difference, formatter);
};

export default genDiff;
