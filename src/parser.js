import jsYaml from 'js-yaml';

const parseFile = (fileData, fileType) => {
  switch (fileType) {
    case 'yml':
    case 'yaml':
      return jsYaml.load(fileData);
    case 'json':
      return JSON.parse(fileData);
    case 'txt':
      return fileData;

    default:
      return new Error(`Unknown file type ${fileType}`);
  }
};

export default parseFile;
