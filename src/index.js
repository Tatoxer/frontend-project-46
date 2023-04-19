import path from 'path';
import fs from 'fs';
import parseFile from './parser.js';
import buildComparisonTreeArray from './compareObjects.js';
import plainFormatter from './formatters/plain.js';
import stylish from './formatters/stylish.js';

const getAbsolutePathFile = (relativePath) => {
  const currentDir = process.cwd().split('/');
  const projectDir = currentDir.join('/');
  if (fs.existsSync(path.resolve(projectDir, relativePath))) {
    return path.resolve(projectDir, relativePath);
  }
  console.log('Please, check paths!');
  console.log(path.resolve(projectDir, relativePath));
  return null;
};

const chooseFormatter = (formatter, threeArray) => {
  switch (formatter) {
    case 'plain':
      return plainFormatter(threeArray);
    case 'json':
      return JSON.stringify(threeArray);
    default:
      return stylish(threeArray);
  }
};

const getFileData = (filePath) => {
  const absolutePath = getAbsolutePathFile(filePath);
  const rawFileData = fs.readFileSync(absolutePath);
  const fileExtension = path.extname(absolutePath);
  return parseFile(rawFileData, fileExtension);
};

const genDiff = (filePath1, filePath2, formatter) => {
  const fileContent1 = getFileData(filePath1);
  const fileContent2 = getFileData(filePath2);

  const difference = buildComparisonTreeArray(fileContent1, fileContent2);

  return chooseFormatter(formatter, difference);
};

export default genDiff;
