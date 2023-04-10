import fs from 'fs';
import getFixturePath from '../scripts/getFixturePath.js';
import genDiff from '../cli/gendiff.js';

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('empty.json');
const filePath4 = getFixturePath('expectedFlat.txt');
const filePath5 = getFixturePath('expectedFlat2.txt');
const filePath6 = getFixturePath('file1.yml');
const filePath7 = getFixturePath('file2.yaml');
const filePath8 = getFixturePath('empty.yaml');
const filePath9 = getFixturePath('file1.html');
const filePath10 = getFixturePath('fileDeep1.json');
const filePath11 = getFixturePath('fileDeep2.json');
const filePath12 = getFixturePath('expectedDeep.txt');
const filePath13 = getFixturePath('fileDeep1.yaml');
const filePath14 = getFixturePath('fileDeep2.yml');


const expectedResult1 = fs.readFileSync(filePath4, 'utf-8');
const expectedResult2 = fs.readFileSync(filePath5, 'utf-8');
const expectedResult3 = fs.readFileSync(filePath12, 'utf-8');

test('genDiff func', () => {
  expect(genDiff(filePath1, filePath2)).toEqual(expectedResult1);
  expect(genDiff(filePath2, filePath3)).toEqual(expectedResult2);
  expect(genDiff(filePath6, filePath7)).toEqual(expectedResult1);
  expect(genDiff(filePath7, filePath8)).toEqual(expectedResult2);
  expect(genDiff(filePath9, filePath9)).toEqual(null);
  expect(genDiff(filePath10, filePath11)).toEqual(expectedResult3);
  expect(genDiff(filePath13, filePath14)).toEqual(expectedResult3);
});
