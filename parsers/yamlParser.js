import jsYaml from 'js-yaml';
import fs from 'fs';

const getYamlFile = (filepath) => jsYaml.load(fs.readFileSync(filepath));

export default getYamlFile;
