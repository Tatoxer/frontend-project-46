import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import parser from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const expectedFlat2Path = getFixturePath('expectedFlat2.txt');
const expectedDeep = getFixturePath('expectedDeep.txt');
const expectedPlain = getFixturePath('expectedPlain.txt');
const expectedJSON = getFixturePath('expectedJSON.json');

test.each([
  {
    content1: getFixturePath('file2.yaml'),
    content2: getFixturePath('empty.yaml'),
    formatter: 'stylish',
    expected: fs.readFileSync(expectedFlat2Path, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.json'),
    formatter: 'stylish',
    expected: fs.readFileSync(expectedDeep, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.yaml'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'stylish',
    expected: fs.readFileSync(expectedDeep, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.yaml'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: undefined,
    expected: fs.readFileSync(expectedDeep, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'stylish',
    expected: fs.readFileSync(expectedDeep, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.json'),
    content2: getFixturePath('fileDeep2.json'),
    formatter: 'plain',
    expected: fs.readFileSync(expectedPlain, 'utf-8'),
  },
  {
    content1: getFixturePath('fileDeep1.yaml'),
    content2: getFixturePath('fileDeep2.yml'),
    formatter: 'json',
    expected: parser(fs.readFileSync(expectedJSON, 'utf-8'), '.json'),
  },
])('genDiff function', ({
  content1, content2, formatter, expected,
}) => {
  expect(genDiff(content1, content2, formatter)).toEqual(expected);
});
