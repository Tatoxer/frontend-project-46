import getYamlFile from '../parsers/yamlParser.js';
import getFixturePath from '../scripts/getFixturePath.js';

const path1 = getFixturePath('file1.yml');
const path2 = getFixturePath('file2.yaml');
const path3 = getFixturePath('empty.yaml');

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

test('getYamlFile', () => {
  expect(getYamlFile(path1)).toEqual(expectedResult1);
  expect(getYamlFile(path2)).toEqual(expectedResult2);
  expect(getYamlFile(path3)).toEqual({});
});
