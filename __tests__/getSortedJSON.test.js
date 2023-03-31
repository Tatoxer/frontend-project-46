import fs from 'fs';
import getSortedJSON from '../scripts/getSortedJSON.js';
import getFixturePath from '../scripts/getFixturePath.js';

const intitialJSON = JSON.parse(fs.readFileSync(getFixturePath('file2.json')));
const emptyJSON = JSON.parse(fs.readFileSync(getFixturePath('empty.json')));
const sortedJSON = JSON.parse(fs.readFileSync(getFixturePath('sortedFlat.json')));

test('getSortedJSON', () => {
  expect(getSortedJSON(intitialJSON)).toEqual(sortedJSON);
  expect(getSortedJSON(emptyJSON)).toEqual(emptyJSON);
});
