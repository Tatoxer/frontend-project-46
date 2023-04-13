import getFixturePath from '../scripts/getFixturePath.js';
import parser from '../src/parser.js';

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('empty.json');
const filePath4 = getFixturePath('file1.yml');
const filePath5 = getFixturePath('file2.yaml');
const filePath6 = getFixturePath('empty.yaml');

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

test('parser', () => {
  expect(parser(filePath1, '.json')).toEqual(expectedResult1);
  expect(parser(filePath2, '.json')).toEqual(expectedResult2);
  expect(parser(filePath3, '.json')).toEqual({});
  expect(parser(filePath4, '.yml')).toEqual(expectedResult1);
  expect(parser(filePath5, '.yaml')).toEqual(expectedResult2);
  expect(parser(filePath6, ',yaml')).toEqual({});
});
