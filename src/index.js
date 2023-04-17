import parseFile from './parser.js';
import getAbsolutePathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import buildComparisonTreeArray from '../scripts/compareObjects.js';
import chooseFormatter from '../scripts/chooseFormatter.js';

const genDiff = (filePath1, filePath2, formatter) => {
  const path1 = getAbsolutePathFile(filePath1);
  const path2 = getAbsolutePathFile(filePath2);

  const fileExtension1 = getFileExtension(path1);
  const fileExtension2 = getFileExtension(path2);
  const fileContent1 = parseFile(path1, fileExtension1);
  const fileContent2 = parseFile(path2, fileExtension2);

  const difference = buildComparisonTreeArray(fileContent1, fileContent2);

  return chooseFormatter(formatter, difference);
};

export default genDiff;
