import fs from 'fs';
import getFixturePath from '../scripts/getFixturePath.js';
import genDiff from '../src/index.js';
import parser from '../src/parser.js';

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('empty.json');
const filePath4 = getFixturePath('expectedFlat.txt');
const filePath5 = getFixturePath('expectedFlat2.txt');
const filePath6 = getFixturePath('file1.yml');
const filePath7 = getFixturePath('file2.yaml');
const filePath8 = getFixturePath('empty.yaml');
const filePath10 = getFixturePath('fileDeep1.json');
const filePath11 = getFixturePath('fileDeep2.json');
const filePath12 = getFixturePath('expectedDeep.txt');
const filePath13 = getFixturePath('fileDeep1.yaml');
const filePath14 = getFixturePath('fileDeep2.yml');
const filePath15 = getFixturePath('expectedPlain.txt');
const filePath16 = getFixturePath('expectedJSON.json');

const expectedResult1 = fs.readFileSync(filePath4, 'utf-8');
const expectedResult2 = fs.readFileSync(filePath5, 'utf-8');
const expectedResult3 = fs.readFileSync(filePath12, 'utf-8');
const expectedResult4 = fs.readFileSync(filePath15, 'utf-8');
const expectedResult5 = parser(fs.readFileSync(filePath16, 'utf-8'), '.json');

test.each([
  { a: filePath1, b: filePath2, expected: expectedResult1 },
  { a: filePath2, b: filePath3, expected: expectedResult2 },
  { a: filePath6, b: filePath7, expected: expectedResult1 },
  { a: filePath7, b: filePath8, expected: expectedResult2 },
  { a: filePath10, b: filePath11, expected: expectedResult3 },
  { a: filePath13, b: filePath14, expected: expectedResult3 },
])('genDiff function default parameters', ({ a, b, expected }) => {
  expect(genDiff(a, b)).toBe(expected);
});

test('genDiff function', () => {
  expect(genDiff(filePath10, filePath11, 'plain')).toEqual(expectedResult4);
  expect(genDiff(filePath13, filePath14, 'json')).toEqual(expectedResult5);
});
