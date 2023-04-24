import path from 'path';
import fs from 'fs';
import parseFile from './parser.js';
import buildObjectsComparisonTree from './compareObjects.js';
import chooseFormatter from './formatters/chooseFormatter.js';

const getAbsolutePathFile = (relativePath) => {
  const currentDir = process.cwd().split('/');
  const projectDir = currentDir.join('/');
  return path.resolve(projectDir, relativePath);
};

const getFileData = (filePath) => {
  const absolutePath = getAbsolutePathFile(filePath);
  const rawFileData = fs.readFileSync(absolutePath);
  const fileExtension = path.extname(absolutePath);
  return parseFile(rawFileData, fileExtension);
};

const genDiff = (filePath1, filePath2, formatter = 'stylish') => {
  const fileContent1 = getFileData(filePath1);
  const fileContent2 = getFileData(filePath2);

  const difference = buildObjectsComparisonTree(fileContent1, fileContent2);

  return chooseFormatter(formatter, difference);
};

export default genDiff;
