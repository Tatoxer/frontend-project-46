import getSortedObject from '../scripts/getSortedObject.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import getFileExtension from '../scripts/getFileExtension.js';
import getYamlFile from '../parsers/yamlParser.js';
import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from '../scripts/getFixturePath.js';
import compareObjects from '../scripts/compareObjects.js';
import stylish from '../scripts/formatters.js';

const genDiff = (filePath1, filePath2) => {
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
      file1 = getYamlFile(path1);
      file2 = getYamlFile(path2);
      break;
    case '.yml':
      file1 = getYamlFile(path1);
      file2 = getYamlFile(path2);
      break;
    default:
      return null;
  }

  const difference = compareObjects(file1, file2);
  const sortedDifference = getSortedObject(difference);
  return stylish(sortedDifference);
};

export default genDiff;

// const file1 = getFixturePath('file1.json');
// const file2 = getFixturePath('file2.json');
//
// console.log(genDiff(file1, file2));
