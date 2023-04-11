import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import getYamlFile from '../parsers/yamlParser.js';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from '../scripts/getFixturePath.js';
import compareObjects from '../scripts/compareObjects.js';
import stylish from './formatters/stylish.js';
import buildComparisonTreeArray from '../scripts/compareObjects.js';

const genDiff = (filePath1, filePath2, formatter) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const fileExtension = getFileExtension(path1);
  let file1;
  let file2;
  switch (fileExtension) {
    case '.json':
      file1 = getJsonFile(path1);
      file2 = getJsonFile(path2);
      break;
    case '.yaml':
    case '.yml':
      file1 = getYamlFile(path1);
      file2 = getYamlFile(path2);
      break;
    default:
      return null;
  }

  const difference = buildComparisonTreeArray(file1, file2);

  switch (formatter) {
    default:
      return stylish(difference);
  }
};

export default genDiff;
