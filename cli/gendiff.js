import getSortedObject from '../scripts/getSortedObject.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import compareObjects from '../scripts/compareObjects.js';
import getFileExtension from '../scripts/getFileExtension.js';
import getYamlFile from '../parsers/yamlParser.js';
import getJsonFile from '../parsers/jsonParser.js';

const genDiff = (filePath1, filePath2) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const fileExtension = getFileExtension(path1);
  let file1;
  let file2;

  switch (fileExtension) {
    case '.json':
      file1 = getSortedObject(getJsonFile(path1));
      file2 = getSortedObject(getJsonFile(path2));
      break;
    case '.yaml':
      file1 = getSortedObject(getYamlFile(path1));
      file2 = getSortedObject(getYamlFile(path2));
      break;
    case '.yml':
      file1 = getSortedObject(getYamlFile(path1));
      file2 = getSortedObject(getYamlFile(path2));
      break;
    default:
      return null;
  }

  const difference = compareObjects(file1, file2);
  return ['{\n', ...difference, '}'].join('');
};

export default genDiff;
