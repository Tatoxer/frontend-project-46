import fs from 'fs';
import path from 'path';
import parseFile from './parser.js';
import buildDifference from './buildDifference.js';
import chooseFormatter from './formatters/index.js';

const getFileType = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const rawFileData1 = fs.readFileSync(filePath1, 'utf-8');
  const rawFileData2 = fs.readFileSync(filePath2, 'utf-8');
  const fileType1 = getFileType(filePath1);
  const fileType2 = getFileType(filePath2);

  const fileContent1 = parseFile(rawFileData1, fileType1);
  const fileContent2 = parseFile(rawFileData2, fileType2);

  const difference = buildDifference(fileContent1, fileContent2);

  return chooseFormatter(difference, formatter);
};

export default genDiff;
