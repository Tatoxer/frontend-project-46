import parseFile from './parser.js';
import getAbsolutePathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import buildComparisonTreeArray from '../scripts/compareObjects.js';
import chooseFormatter from '../scripts/chooseFormatter.js';
import getRawFileData from '../scripts/getRawFileData.js';

const genDiff = (filePath1, filePath2, formatter) => {
  const path1 = getAbsolutePathFile(filePath1);
  const path2 = getAbsolutePathFile(filePath2);
  const rawFileData1 = getRawFileData(path1);
  const rawFileData2 = getRawFileData(path2);

  const fileExtension1 = getFileExtension(path1);
  const fileExtension2 = getFileExtension(path2);
  const fileContent1 = parseFile(rawFileData1, fileExtension1);
  const fileContent2 = parseFile(rawFileData2, fileExtension2);

  const difference = buildComparisonTreeArray(fileContent1, fileContent2);

  return chooseFormatter(formatter, difference);
};

export default genDiff;
