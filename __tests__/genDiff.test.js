import fs from 'fs';
import getFixturePath from '../scripts/getFixturePath.js';
import genDiff from '../cli/gendiff.js';

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('empty.json');
const filePath4 = getFixturePath('expectedFlat.txt');
const filePath5 = getFixturePath('expectedFlat2.txt');

const expectedResult1 = fs.readFileSync(filePath4, 'utf-8');
const expectedResult2 = fs.readFileSync(filePath5, 'utf-8');

test('genDiff func', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResult1);
  expect(genDiff(filePath2, filePath3)).toEqual(expectedResult2);
});
