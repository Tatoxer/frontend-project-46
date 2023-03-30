import fs from 'fs';
import getSortedJSON from '../scripts/getSortedJSON.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';
import compareObjects from '../scripts/compareObjects.js';

const genDiff = (filePath1, filePath2) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const file1 = getSortedJSON(JSON.parse(fs.readFileSync(path1)));
  const file2 = getSortedJSON(JSON.parse(fs.readFileSync(path2)));

  const difference = compareObjects(file1, file2);
  return ['{\n', ...difference, '}'].join('');
};

export default genDiff;
