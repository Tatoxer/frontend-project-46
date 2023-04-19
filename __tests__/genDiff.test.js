import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import parser from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFlatPath = getFixturePath('expectedFlat.txt');
const expectedFlat2Path = getFixturePath('expectedFlat2.txt');
const expectedDeep = getFixturePath('expectedDeep.txt');
const expectedPlain = getFixturePath('expectedPlain.txt');
const expectedJSON = getFixturePath('expectedJSON.json');

const expectedResult1 = fs.readFileSync(expectedFlatPath, 'utf-8');
const expectedResult2 = fs.readFileSync(expectedFlat2Path, 'utf-8');
const expectedResult3 = fs.readFileSync(expectedDeep, 'utf-8');
const expectedResult4 = fs.readFileSync(expectedPlain, 'utf-8');
const expectedResult5 = parser(fs.readFileSync(expectedJSON, 'utf-8'), '.json');

test.each([
  {
    content1: getFixturePath('file1.json'),
    content2: getFixturePath('file2.json'),
    formatter: 'stylish',
    expected: expectedResult1,
  },
  {
    content1: getFixturePath('file2.json'),
    content2: getFixturePath('empty.json'),
    formatter: 'stylish',
    expected: expectedResult2,
  },
  {
    content1: getFixturePath('file1.yml'),
    content2: getFixturePath('file2.yaml'),
    formatter: 'stylish',
    expected: expectedResult1,
  },
  {
    content1: getFixturePath('file2.yaml'),
    content2: getFixturePath('empty.yaml'),
    formatter: 'stylish',
    expected: expectedResult2,
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.json'),
    formatter: 'stylish',
    expected: expectedResult3,
  },
  {
    content1: getFixturePath('fileDeep1.yaml'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'stylish',
    expected: expectedResult3,
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'stylish',
    expected: expectedResult3,
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.json'),
    formatter: 'plain',
    expected: expectedResult4,
  },
  {
    content1: getFixturePath('fileDeep1.yaml'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'json',
    expected: expectedResult5,
  },
])('genDiff function', ({
  content1, content2, formatter, expected,
}) => {
  expect(genDiff(content1, content2, formatter)).toEqual(expected);
});
