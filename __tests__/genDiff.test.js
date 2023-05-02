import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';
import parseFile from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test.each([
  {
    fileName1: 'fileDeep1.json',
    fileName2: 'fileDeep2.json',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    fileName1: 'fileDeep1.yaml',
    fileName2: 'fileDeep2.yml',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    fileName1: 'fileDeep1.yaml',
    fileName2: 'fileDeep2.yml',
    formatter: undefined,
    expected: 'expectedDeep.txt',
  },
  {
    fileName1: 'fileDeep1.json',
    fileName2: 'fileDeep2.yml',
    formatter: 'stylish',
    expected: 'expectedDeep.txt',
  },
  {
    fileName1: 'fileDeep1.json',
    fileName2: 'fileDeep2.json',
    formatter: 'plain',
    expected: 'expectedPlain.txt',
  },
  {
    fileName1: 'fileDeep1.yaml',
    fileName2: 'fileDeep2.yml',
    formatter: 'json',
    expected: 'expectedJSON.json',
  },
])('.genDiff(%s, %s)', ({
  fileName1, fileName2, formatter, expected,
}) => {
  const rawFileData = fs.readFileSync(getFixturePath(expected), 'utf-8');
  const fileType = path.extname(expected).slice(1);

  expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), formatter))
    .toEqual(parseFile(rawFileData, fileType));
});
