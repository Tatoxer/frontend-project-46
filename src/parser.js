import jsYaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parseFile = (filePath) => {
  const rawFileData = fs.readFileSync(filePath, 'utf-8');
  const fileExtension = path.extname(filePath).slice(1);
  switch (fileExtension) {
    case 'yml':
    case 'yaml':
      return jsYaml.load(rawFileData);
    case 'json':
      return JSON.parse(rawFileData);
    case 'txt':
      return rawFileData;

    default:
      return new Error(`Unknown file format ${fileExtension}`);
  }
};

export default parseFile;
