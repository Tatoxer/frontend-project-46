import getFixturePath from '../scripts/getFixturePath.js';
import parser from '../src/parser.js';
import getRawFileData from '../scripts/getRawFileData.js';

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('empty.json');
const filePath4 = getFixturePath('file1.yml');
const filePath5 = getFixturePath('file2.yaml');
const filePath6 = getFixturePath('empty.yaml');

const fileData1 = getRawFileData(filePath1);
const fileData2 = getRawFileData(filePath2);
const fileData3 = getRawFileData(filePath3);
const fileData4 = getRawFileData(filePath4);
const fileData5 = getRawFileData(filePath5);
const fileData6 = getRawFileData(filePath6);

const expectedResult1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};
const expectedResult2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test.each([
  { a: fileData1, b: '.json', expected: expectedResult1 },
  { a: fileData2, b: '.json', expected: expectedResult2 },
  { a: fileData3, b: '.json', expected: {} },
  { a: fileData4, b: '.yml', expected: expectedResult1 },
  { a: fileData5, b: '.yaml', expected: expectedResult2 },
  { a: fileData6, b: '.yaml', expected: {} },
])('parser function', ({ a, b, expected }) => {
  expect(parser(a, b)).toEqual(expected);
});
