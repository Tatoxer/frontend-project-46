import jsYaml from 'js-yaml';
import fs from 'fs';

const parseFile = (filePath, fileExtension) => {
  switch (fileExtension) {
    case '.yml':
    case '.yaml':
      return jsYaml.load(fs.readFileSync(filePath, 'utf-8'));

    default:
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }
};

export default parseFile;
