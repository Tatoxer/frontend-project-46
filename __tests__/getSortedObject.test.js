import fs from 'fs';
import getSortedObject from '../scripts/getSortedObject.js';
import getFixturePath from '../scripts/getFixturePath.js';

const intitialJSON = JSON.parse(fs.readFileSync(getFixturePath('file2.json')));
const emptyJSON = JSON.parse(fs.readFileSync(getFixturePath('empty.json')));
const sortedJSON = JSON.parse(fs.readFileSync(getFixturePath('sortedFlat.json')));

test('getSortedJSON', () => {
  expect(getSortedObject(intitialJSON)).toEqual(sortedJSON);
  expect(getSortedObject(emptyJSON)).toEqual(emptyJSON);
});
