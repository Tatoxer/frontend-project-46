import getJsonFile from '../parsers/jsonParser.js';
import getFixturePath from './getFixturePath.js';
import compareObjects from './compareObjects.js';

const stylish = (obj) => {
  const entries = Object.entries(obj);
};

// export default stylish;

const file1 = getJsonFile(getFixturePath('fileDeep1.json'));
const file2 = getJsonFile(getFixturePath('fileDeep2.json'));
const diff = compareObjects(file1, file2);

console.log(JSON.stringify(diff));
// console.log(diff);
const formatted = stylish(diff);
console.log(formatted);
