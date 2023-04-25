import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';
import parseFile from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    content1: 'fileDeep1.json',
    content2: 'fileDeep2.json',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    content1: 'fileDeep1.yaml',
    content2: 'fileDeep2.yml',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    content1: 'fileDeep1.yaml',
    content2: 'fileDeep2.yml',
    formatter: undefined,
    expected: 'expectedDeep.txt',
  },
  {
    content1: 'fileDeep1.json',
    content2: 'fileDeep2.yml',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    content1: 'fileDeep1.json',
    content2: 'fileDeep2.json',
    formatter: 'plain',
    expected: 'expectedPlain.txt',
  },
  {
    content1: 'fileDeep1.yaml',
    content2: 'fileDeep2.yml',
    formatter: 'json',
    expected: 'expectedJSON.json',
  },
])('genDiff function', ({
  content1, content2, formatter, expected,
}) => {
  expect(genDiff(getFixturePath(content1), getFixturePath(content2), formatter))
    .toEqual(parseFile(getFixturePath(expected)));
});
