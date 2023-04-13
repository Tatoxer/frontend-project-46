import parseFile from './parser.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import stylish from './formatters/stylish.js';
import plainFormatter from './formatters/plain.js';
import buildComparisonTreeArray from '../scripts/compareObjects.js';
import jsonFormatter from './formatters/json.js';

const genDiff = (filePath1, filePath2, formatter) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const fileExtension = getFileExtension(path1);
  const file1 = parseFile(path1, fileExtension);
  const file2 = parseFile(path2, fileExtension);

  const difference = buildComparisonTreeArray(file1, file2);

  switch (formatter) {
    case 'plain':
      return plainFormatter(difference);
    case 'json':
      return jsonFormatter(difference);
    default:
      return stylish(difference);
  }
};

export default genDiff;
