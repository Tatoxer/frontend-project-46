import getJsonFile from '../parsers/jsonParser.js';
import getYamlFile from '../parsers/yamlParser.js';
import getFixturePath from '../scripts/getFixturePath.js';

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

test('JSON parser', () => {
  expect(getJsonFile(filePath1)).toEqual(expectedResult1);
  expect(getJsonFile(filePath2)).toEqual(expectedResult2);
  expect(getJsonFile(filePath3)).toEqual({});
});

test('yaml parer', () => {
  expect(getYamlFile(filePath4)).toEqual(expectedResult1);
  expect(getYamlFile(filePath5)).toEqual(expectedResult2);
  expect(getYamlFile(filePath6)).toEqual({});
});
