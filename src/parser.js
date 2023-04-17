import jsYaml from 'js-yaml';

const parseFile = (file, fileExtension) => {
  switch (fileExtension) {
    case '.yml':
    case '.yaml':
      return jsYaml.load(file);
    case '.json':
      return JSON.parse(file);

    default:
      return new Error(`Unknown file format ${fileExtension}`);
  }
};

export default parseFile;
