import fs from 'fs';
import getSortedJSON from '../scripts/getSortedJSON.js';
import getAbsPathFile from '../scripts/getAbsoluteFilePath.js';

const genDiff = (filePath1, filePath2) => {
  const path1 = getAbsPathFile(filePath1);
  const path2 = getAbsPathFile(filePath2);

  const file1 = getSortedJSON(JSON.parse(fs.readFileSync(path1)));
  const file2 = getSortedJSON(JSON.parse(fs.readFileSync(path2)));

  const entries = Object.entries(file1);
  const obj2Keys = Object.keys(file2);

  const obj1Difference = entries.flatMap(([key, value]) => {
    const array = [];

    // Если есть ключ но не совпадают значения
    if (Object.hasOwn(file2, key) && value !== file2[key]) {
      array.push(`- ${key}: ${value}\n`);
      array.push(`+ ${key}: ${file2[key]}\n`);
    }

    // Если совпадают ключи и значения
    if (Object.hasOwn(file2, key) && value === file2[key]) {
      array.push(`  ${key}: ${value}\n`);
    }

    // Если нет ключа
    if (!Object.hasOwn(file2, key)) {
      array.push(`- ${key}: ${value}\n`);
    }
    return array;
  });

  const obj2Difference = obj2Keys.flatMap((key) => {
    const array = [];

    if (!Object.hasOwn(file1, key)) {
      array.push(`+ ${key}: ${file2[key]}\n`);
    }
    return array;
  });
  return [...obj1Difference, ...obj2Difference].join('');
};

export default genDiff;
